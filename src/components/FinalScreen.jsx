import React, { useEffect } from "react";

const FinalVideoScreen = ({ onVideoEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 5000); // 5 saniye sonra otomatik geç
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div className="final-video-screen">
      <h2>Final Videosu Oynatılıyor...</h2>
      <video autoPlay muted>
        <source src="/videos/final.mp4" type="video/mp4" />
      </video>
      <p>Video bitince analiz ekranına geçilecektir...</p>
    </div>
  );
};

export default FinalVideoScreen;