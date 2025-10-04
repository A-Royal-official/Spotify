import React, { useState } from "react";
import Library from "../components/Library";
import YoutubeDownloader from "../components/YoutubeDownloader";

export default function LibraryPage() {
  const [refreshLibrary, setRefreshLibrary] = useState(false);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Library</h2>
      <Library refresh={refreshLibrary} />
      <div className="mt-8">
        <YoutubeDownloader onDownloadComplete={() => setRefreshLibrary(!refreshLibrary)} />
      </div>
    </div>
  );
}


