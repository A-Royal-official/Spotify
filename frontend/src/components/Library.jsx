import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

export default function Library({ refresh }) {
  const [songs, setSongs] = useState([]);
  const { setQueueAndPlay } = usePlayer();

  useEffect(() => {
    // Try to fetch from backend, fallback to demo data
    axios.get("http://localhost:5000/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => {
        console.log("Backend not available, using demo data");
        // Demo data for when backend isn't available (like on GitHub Pages)
        setSongs([
          "Flawlëss (feat. Lil Uzi Vert) [Official Audio]",
          "Travis Scott - goosebumps ft. Kendrick Lamar",
          "Ken Carson - ss (Official Audio)",
          "Rich Amiri - One Call (Official Audio)",
          "Travis Scott - FE!N (Official Audio) ft. Playboi Carti"
        ]);
      });
  }, [refresh]); // 👈 re-fetch when refresh changes

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Library</h3>
      {songs.length === 0 ? (
        <p className="text-gray-400">No songs yet. Download something!</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {songs.map((song, idx) => {
            const tracks = songs.map((s) => ({
              title: s.title || s,
              url: s.path
                ? `http://localhost:5000${s.path}`
                : `http://localhost:5000/music/${encodeURIComponent(s)}`,
            }));
            const title = song.title || song;
            return (
              <li
                key={idx}
                className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 cursor-pointer"
                onClick={() => {
                  // Show demo message for GitHub Pages
                  if (window.location.hostname.includes('github.io')) {
                    alert('🎵 Demo Mode: This is a preview of the Spotify clone! For full functionality, run the backend locally.');
                    return;
                  }
                  setQueueAndPlay(tracks, idx);
                }}
                title="Play"
              >
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-gray-400">{song.artist || ""}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
