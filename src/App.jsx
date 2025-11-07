import React, { useState } from 'react';
import './index.css';
import WelcomeScreen from './components/WelcomeScreen';
import CharacterSelection from './components/CharacterSelection';
import Game from './components/Game';
import AnalysisScreen from "./components/AnalysisScreen";
import FinalScreen from "./components/FinalScreen";


function App() {
    // 'WELCOME', 'SELECTION', 'GAME', 'FINAL_VIDEO', 'ANALYSIS'
    const [gameState, setGameState] = useState('WELCOME');
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // YENİ STATE: Oyun sonuçlarını burada tutacağız
    const [gameResults, setGameResults] = useState([]);
    
    // Task 4: Kullanıcı cevaplarını kaydetme sistemi
    const [userAnswers, setUserAnswers] = useState([]);

    const handleStartGame = () => {
        console.log("-> Karakter Seçime Geçiliyor.");
        setGameState('SELECTION');
    };

    const handleCharacterSelection = (character) => {
        if (character && character.id) {
            console.log(`-> ${character.name} seçildi. Oyuna başlanıyor.`);

            // YENİ: Oyuna başlarken eski sonuçları temizle
            setGameResults([]);
            setUserAnswers([]); // Task 4: Kullanıcı cevaplarını da temizle

            setSelectedCharacter(character);
            setGameState('GAME');
        } else {
            console.error("HATA: Geçersiz karakter seçimi yapıldı.");
        }
    };

    // GÜNCELLENDİ: Oyun bittiğinde WELCOME yerine FINAL_VIDEO'ya git
    const handleGameEnd = () => {
        console.log(`-> Simülasyon Bitti. Final Videosuna Geçiliyor.`);
        setGameState('FINAL_VIDEO'); // WELCOME'dan FINAL_VIDEO'ya değiştirildi
    }

    // YENİ FONKSİYON: Final videosu bittiğinde tetiklenir
    const handleFinalVideoEnd = () => {
        console.log("-> Final Video Bitti. Analiz Ekranına Geçiliyor.");
        setGameState('ANALYSIS');
    }

    // YENİ FONKSİYON: Analiz ekranından sonra oyunu yeniden başlatır
    const handleRestart = () => {
        console.log("-> Analiz Bitti. Ana Ekrana Dönülüyor.");
        setSelectedCharacter(null);
        setGameResults([]); // Sonuçları temizle
        setUserAnswers([]); // Task 4: Kullanıcı cevaplarını da temizle
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
            // Duplicate kontrolü: Aynı eventId ve timestamp'e sahip cevap varsa ekleme
            const isDuplicate = prevAnswers.some(
                prevAnswer => prevAnswer.eventId === answer.eventId && 
                              Math.abs(prevAnswer.timestamp - answer.timestamp) < 1000 // 1 saniye içinde
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

    // GÜNCELLENDİ: renderScreen fonksiyonuna yeni case'ler eklendi
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
                            key={selectedCharacter.id} // Her karakter seçiminde component'i yeniden mount et
                            selectedCharacter={selectedCharacter}
                            onGameEnd={handleGameEnd}
                            // YENİ PROP: Sonuçları kaydetmek için fonksiyonu Game'e yolla
                            onRecordResult={handleRecordResult}
                            // Task 4: Kullanıcı cevaplarını kaydetme fonksiyonu
                            onSaveUserAnswer={handleSaveUserAnswer}
                            // Task 8: Kullanıcı cevaplarını Game component'ine geç
                            userAnswers={userAnswers}
                            // Task 8: Kullanıcı cevaplarını temizleme fonksiyonu
                            onClearUserAnswers={handleClearUserAnswers}
                        />
                    );
                }
                console.error("HATA: Game ekranında karakter yok. Başa dönülüyor.");
                return <WelcomeScreen onStartGame={handleStartGame} />;

            // YENİ CASE: Final Videosu
            case 'FINAL_VIDEO':
                return <FinalScreen onVideoEnd={handleFinalVideoEnd} />;

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