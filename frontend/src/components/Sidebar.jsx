import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-zinc-900 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">🎵 My Spotify</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Home</NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Search</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Library</NavLink>
      </nav>
    </aside>
  );
}
