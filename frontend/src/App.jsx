import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Home from "./pages/Home";
import Search from "./pages/Search";
import LibraryPage from "./pages/LibraryPage";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<LibraryPage />} />
            </Routes>
          </div>

          {/* Player Bar */}
          <Player />
        </main>
      </div>
    </PlayerProvider>
  );
}
