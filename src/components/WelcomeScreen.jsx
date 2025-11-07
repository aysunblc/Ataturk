import React from 'react';

const WelcomeScreen = ({ onStartGame }) => {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                
                <h1 className="welcome-title">
                    "Kahramanlarımızın İzinden"
                </h1>
                <h2 className="welcome-subtitle">
                    Bir Milletin Kaderini Değiştiren Kararlar
                </h2>

                <p className="welcome-text">
                    Milli Mücadele'nin en kritik anlarına tanık olmaya hazır mısınız?
                    Bu simülasyonda, tarihin akışını değiştiren kararları alacak,
                    bir ulusun kaderine yön vereceksiniz.
                </p>
                <p className="welcome-text">
                    Cesaret, strateji ve liderlik... Hepsi sizin ellerinizde.
                </p>

                <button 
                    className="start-button" 
                    onClick={onStartGame}
                    style={{ marginBottom: '40px' }} // Buton ile resim arasına boşluk
                >
                    <span>Simülasyona Başla</span> 
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;