import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appId, secret } from "./variables";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveStream = async (element) => {
    const appID = appId;
    const serverSecret = secret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      "Rohini chellappan"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/room/${id}`,
        },
      ],
    });
    setIsConnected(true);
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

  const goHome = () => {
    navigate('/');
  };

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
        <div className="mb-4 md:mb-0 flex items-center space-x-4">
          <button
            onClick={goHome}
            className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Lively
            </h1>
            <p className="text-sm text-gray-400 mt-1 tracking-wide">Room: {id}</p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <div className="text-gray-400 text-sm mb-1">{formatDate(currentTime)}</div>
          <div className="text-xl md:text-2xl font-mono tracking-widest text-gray-200">{formatTime(currentTime)}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col px-6 md:px-12 lg:px-20 py-8">
        {/* Room Status */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
            <span className="text-gray-300 text-sm tracking-wide">
              {isConnected ? 'Connected • Live' : 'Connecting...'}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
          
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="flex-1 rounded-3xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 overflow-hidden shadow-2xl">
          <div 
            ref={liveStream} 
            className="w-full h-full min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>

        {/* Room Info Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
             
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            

            
            </div>
          </div>
          
        
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-500 py-6 border-t border-gray-800/50">
       
      </footer>
    </div>
  );
};

export default Room;