import React, { useState } from 'react';
import './index.css';
import WelcomeScreen from './components/WelcomeScreen';
import CharacterSelection from './components/CharacterSelection';
import Game from './components/Game';
import AnalysisScreen from "./components/AnalysisScreen";
 
function App() {
    // 'WELCOME', 'SELECTION', 'GAME', 'ANALYSIS'
    // 'FINAL_VIDEO' durumu kaldırıldı
    const [gameState, setGameState] = useState('WELCOME');
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const [gameResults, setGameResults] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleStartGame = () => {
        console.log("-> Karakter Seçime Geçiliyor.");
        setGameState('SELECTION');
    };

    const handleCharacterSelection = (character) => {
        if (character && character.id) {
            console.log(`-> ${character.name} seçildi. Oyuna başlanıyor.`);
            setGameResults([]);
            setUserAnswers([]); 
            setSelectedCharacter(character);
            setGameState('GAME');
        } else {
            console.error("HATA: Geçersiz karakter seçimi yapıldı.");
        }
    };
  
    // *** KALDIRILDI ***
    // handleFinalVideoEnd fonksiyonu kaldırıldı, artık gerek yok.

    // *** YENİ/GÜNCELLENMİŞ FONKSİYON ***
    // Game.js'den 'onGameEnd' çağrıldığında, doğrudan Analiz ekranına geç
    const handleGameEnd = () => {
        console.log("-> Oyun Bitti. Analiz Ekranına Geçiliyor.");
        setGameState('ANALYSIS');
    }

    // YENİ FONKSİYON: Analiz ekranından sonra oyunu yeniden başlatır
    const handleRestart = () => {
        console.log("-> Analiz Bitti. Ana Ekrana Dönülüyor.");
        setSelectedCharacter(null);
        setGameResults([]); 
        setUserAnswers([]); 
        setGameState('WELCOME');
    }

    // YENİ FONKSİYON: Game.js'den gelen sonuçları kaydeder
    const handleRecordResult = (result) => {
        setGameResults(prevResults => [...prevResults, result]);
    }
    
    // Task 4: Kullanıcı cevaplarını kaydetme fonksiyonu
    const handleSaveUserAnswer = (answer) => {
        console.log('📝 App.jsx - handleSaveUserAnswer called with:', answer);
        setUserAnswers(prevAnswers => {
            const isDuplicate = prevAnswers.some(
                prevAnswer => prevAnswer.eventId === answer.eventId && 
                              Math.abs(prevAnswer.timestamp - answer.timestamp) < 1000 
            );
            
            if (isDuplicate) {
                console.warn('⚠️ Duplicate answer detected, skipping:', answer);
                return prevAnswers;
            }
            
            const newAnswers = [...prevAnswers, answer];
            console.log('📝 App.jsx - Previous answers:', prevAnswers);
            console.log('📝 App.jsx - New answers array:', newAnswers);
            return newAnswers;
        });
    }
    
    // Task 8: Kullanıcı cevaplarını temizleme fonksiyonu
    const handleClearUserAnswers = () => {
        console.log('🗑️ App.jsx - Clearing user answers');
        setUserAnswers([]);
        setGameResults([]);
        console.log('✅ App.jsx - User answers cleared');
    }

    // GÜNCELLENDİ: renderScreen fonksiyonu
    const renderScreen = () => {
        switch (gameState) {
            case 'WELCOME':
                return <WelcomeScreen onStartGame={handleStartGame} />;

            case 'SELECTION':
                return <CharacterSelection onSelectCharacter={handleCharacterSelection} />;

            case 'GAME':
                if (selectedCharacter) {
                    console.log('🎮 App.jsx - Rendering Game component');
                    console.log('🎮 App.jsx - Passing userAnswers:', userAnswers);
                    console.log('🎮 App.jsx - userAnswers length:', userAnswers.length);
                    return (
                        <Game
                            key={selectedCharacter.id} 
                            selectedCharacter={selectedCharacter}
                            // *** GÜNCELLENDİ: handleGameEnd (eskiden handleGameEnd idi)
                            onGameEnd={handleGameEnd} 
                            onRecordResult={handleRecordResult}
                            onSaveUserAnswer={handleSaveUserAnswer}
                            userAnswers={userAnswers}
                            onClearUserAnswers={handleClearUserAnswers}
                        />
                    );
                }
                console.error("HATA: Game ekranında karakter yok. Başa dönülüyor.");
                return <WelcomeScreen onStartGame={handleStartGame} />;

            // *** KALDIRILDI ***
            // 'FINAL_VIDEO' case'i kaldırıldı
            
            // YENİ CASE: Analiz Ekranı
            case 'ANALYSIS':
                return <AnalysisScreen results={gameResults} userAnswers={userAnswers} onRestart={handleRestart} />;

            default:
                return <WelcomeScreen onStartGame={handleStartGame} />;
        }
    };

    return (
        <div className="app-main-content">
            {renderScreen()}
        </div>
    );
}

export default App;