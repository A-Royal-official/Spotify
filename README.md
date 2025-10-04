# 🎵 Spotify Clone

A modern music streaming application built with React and Node.js, featuring YouTube music downloads and a beautiful Spotify-inspired interface.

## 🌐 Live Demo

**Frontend**: [https://a-royal-official.github.io/Spotify/](https://a-royal-official.github.io/Spotify/)

*Note: The live demo shows the UI. For full functionality (music downloads), you'll need to run the backend locally.*

## ✨ Features

- **🎵 Music Library**: Download and manage your music collection
- **📱 Responsive Design**: Beautiful UI inspired by Spotify's design
- **🎮 Interactive Player**: Full-featured music player with:
  - Play/Pause controls
  - Skip to next/previous tracks
  - Progress bar with seek functionality
  - Time display (current/total duration)
- **📥 YouTube Downloader**: Download music directly from YouTube links
- **🎯 Multiple Pages**: Home, Search, and Library sections
- **🔄 Queue Management**: Automatic playlist management

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **yt-dlp** - YouTube audio downloader
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- yt-dlp installed globally (`pip install yt-dlp`)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/A-Royal-official/Spotify.git
   cd Spotify
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

1. **Download Music**: Go to the Library page and paste a YouTube URL in the downloader
2. **Play Music**: Click on any song in your library to start playing
3. **Control Playback**: Use the player controls at the bottom:
   - Click the progress bar to seek to any position
   - Use play/pause, next/previous buttons
   - View current time and total duration

## 📁 Project Structure

```
Spotify/
├── backend/
│   ├── music/          # Downloaded music files
│   ├── server.js       # Express server
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context (PlayerContext)
│   │   └── App.jsx     # Main app component
│   └── package.json     # Frontend dependencies
└── README.md
```

## 🔧 API Endpoints

- `POST /download` - Download music from YouTube URL
- `GET /songs` - Get list of downloaded songs
- `GET /music/*` - Serve music files

## 🎨 Features in Detail

### Music Player
- **Progress Bar**: Visual representation of song progress
- **Seek Functionality**: Click anywhere on the progress bar to jump to that time
- **Time Display**: Shows current time and total duration
- **Queue Management**: Automatic next track playback

### Download System
- **YouTube Integration**: Download audio from any YouTube video
- **Automatic Conversion**: Converts to MP3 format
- **Library Management**: Automatically adds downloaded songs to your library

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify for the design inspiration
- yt-dlp for the YouTube download functionality
- React and Node.js communities for the amazing tools

---

**Note**: This project is for educational purposes only. Please respect copyright laws and YouTube's terms of service when downloading content.
