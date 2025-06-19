import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigateToRoom = () => {
    navigate(`/room/${value}`);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #6b7280 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full opacity-10 blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-gradient-to-br from-gray-600 to-gray-900 rounded-full opacity-10 blur-3xl animate-pulse" />
      </div>

      {/* Header with Date & Time */}
      <header className="relative z-10 py-6 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-800/50">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Lively
          </h1>
          <p className="text-sm text-gray-400 mt-1 tracking-wide">Premium • Exclusive • Elite</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-gray-400 text-sm mb-1">{formatDate(currentTime)}</div>
          <div className="text-xl md:text-2xl font-mono tracking-widest text-gray-200">{formatTime(currentTime)}</div>
        </div>
      </header>

      {/* Main Content - Centered and Responsive */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Room Entry */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-wide leading-tight">
                  Join Your{" "}
                  <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                    Premium
                  </span>{" "}
                  Room
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                  Experience elite communication with ultra-low latency and crystal-clear video quality.
                </p>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter room code..."
                  className="w-full px-6 py-5 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && value && navigateToRoom()}
                />
                <button
                  onClick={navigateToRoom}
                  disabled={!value}
                  className={`w-full py-5 rounded-2xl font-light tracking-wider transition-all duration-300 text-lg ${
                    value
                      ? "bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/50 transform"
                      : "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {value ? "Join Room" : "Enter Room Code"}
                </button>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="group text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-600/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-light text-gray-200 mb-2">Instant</h4>
                  <p className="text-gray-500 text-sm">Lightning Speed</p>
                </div>

                <div className="group text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-600/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-light text-gray-200 mb-2">Secure</h4>
                  <p className="text-gray-500 text-sm">Military Grade</p>
                </div>

                <div className="group text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-600/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-light text-gray-200 mb-2">Premium</h4>
                  <p className="text-gray-500 text-sm">Elite Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-500 py-8 border-t border-gray-800/50">
        <p className="tracking-wide">Experience premium communication — 4K Quality • Zero Latency • Always Online</p>
      </footer>
    </div>
  );
};

export default Home;