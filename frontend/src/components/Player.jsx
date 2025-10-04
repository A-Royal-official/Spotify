import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlay, 
    playNext, 
    playPrev, 
    seek, 
    formatTime 
  } = usePlayer();

  const handleProgressClick = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="bg-zinc-900 p-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <div 
          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer hover:h-2 transition-all"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{currentTrack?.title || "Nothing playing"}</h4>
          <p className="text-sm text-gray-400">{currentTrack ? "" : ""}</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:text-green-400" onClick={playPrev} disabled={!currentTrack}>⏮️</button>
          <button className="hover:text-green-400" onClick={togglePlay} disabled={!currentTrack}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className="hover:text-green-400" onClick={playNext} disabled={!currentTrack}>⏭️</button>
        </div>

        <div>
          <p className="text-sm">{currentTrack ? "" : ""}</p>
        </div>
      </div>
    </footer>
  );
}
