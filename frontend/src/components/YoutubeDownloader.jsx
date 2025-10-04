import React, { useState } from "react";
import axios from "axios";

export default function YoutubeDownloader({ onDownloadComplete }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    if (!url) return;

    setStatus("Downloading...");
    try {
      const res = await axios.post("http://localhost:5000/download", { url });
      setStatus(res.data.message || "Downloaded!");
      setUrl("");
      if (onDownloadComplete) onDownloadComplete(); // 👈 refresh library
    } catch (err) {
      console.error(err);
      setStatus("Error downloading");
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Download from YouTube</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link here..."
          className="flex-1 p-2 rounded bg-zinc-900 border border-gray-700 text-white"
        />
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-bold"
        >
          Download
        </button>
      </div>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
