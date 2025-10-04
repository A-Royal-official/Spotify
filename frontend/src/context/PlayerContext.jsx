import React, { createContext, useContext, useMemo, useRef, useState, useCallback, useEffect } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null); // { title, url }
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); // [{ title, url }]
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const playTrack = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 0);
  }, []);

  const setQueueAndPlay = useCallback((tracks, startIndex = 0) => {
    setQueue(tracks);
    setCurrentIndex(startIndex);
    const track = tracks[startIndex];
    if (track) {
      playTrack(track);
    }
  }, [playTrack]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    const next = currentIndex + 1;
    if (next < queue.length) {
      setCurrentIndex(next);
      playTrack(queue[next]);
    }
  }, [currentIndex, queue, playTrack]);

  const playPrev = useCallback(() => {
    if (queue.length === 0) return;
    const prev = currentIndex - 1;
    if (prev >= 0) {
      setCurrentIndex(prev);
      playTrack(queue[prev]);
    }
  }, [currentIndex, queue, playTrack]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const formatTime = useCallback((seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const value = useMemo(() => ({
    audioRef,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isSeeking,
    playTrack,
    setQueueAndPlay,
    playNext,
    playPrev,
    togglePlay,
    seek,
    formatTime,
  }), [currentTrack, isPlaying, currentTime, duration, isSeeking, playTrack, togglePlay, setQueueAndPlay, playNext, playPrev, seek, formatTime]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.url || ""}
        onEnded={playNext}
        onTimeUpdate={() => {
          if (!isSeeking && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        crossOrigin="anonymous"
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}


