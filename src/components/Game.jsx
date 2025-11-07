import React, { useState, useEffect, useRef } from 'react';
import { GAME_EVENTS } from '../data/events';

/**
 * AŞAMA 1: Olayın giriş videosunu tam ekran oynatan bileşen
 */
const IntroVideoPlayer = ({ videoSrc, onEnded, onError }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <video
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={onEnded}
                onError={onError}
                aria-label="Olay giriş videosu"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
            >
                Giriş videosu yükleniyor...
            </video>
        </div>
    );
};

 

const Game = ({ selectedCharacter, onGameEnd, onRecordResult, onSaveUserAnswer, userAnswers = [], onClearUserAnswers }) => {
    // Debug logging: Track userAnswers prop changes
    console.log('🎮 Game Component Rendered');
    console.log('📊 userAnswers prop:', userAnswers);
    console.log('📊 userAnswers length:', userAnswers.length);
    
    const events = GAME_EVENTS[selectedCharacter.id] || [];
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); // Seçilen opsiyonun kendisi
    const [showOutcome, setShowOutcome] = useState(false); // Sonuç videosunun oynatılacağını tetikler

    const [localSelectedSide, setLocalSelectedSide] = useState(null); // 'left' veya 'right' hangi tarafın seçildiği
    const [isHovered, setIsHovered] = useState(null); // Seçenek hover durumu
    const [isAnimatingOut, setIsAnimatingOut] = useState(false); // Ekranın animasyonla kapanması
    const [localFeedback, setLocalFeedback] = useState(null); // Kısa süreli geri bildirim (DOĞRU/YANLIŞ)

    const [showingIntro, setShowingIntro] = useState(true); // Giriş videosu gösteriliyor mu?
    const [videoFinished, setVideoFinished] = useState(false); // Sonuç videosu bitti mi?
   
    const [shuffledOptions, setShuffledOptions] = useState([]); // Randomized option positions

    const audioRef = useRef(null);
    const currentEvent = events[currentEventIndex];
    const preloadVideoRef = useRef(null);
    
    /**
     * Debug: Track userAnswers changes
     */
    useEffect(() => {
        console.log('🔄 userAnswers changed in Game component:', userAnswers);
        console.log('🔄 Total answers:', userAnswers.length);
        if (userAnswers.length > 0) {
            console.log('🔄 Latest answer:', userAnswers[userAnswers.length - 1]);
        }
    }, [userAnswers]);

     
    /**
     * Video preloading: Sonraki videonun ön yüklemesi (Task 12)
     */
    useEffect(() => {
        // Sonraki olay varsa videolarını preload et
        if (currentEventIndex < events.length - 1) {
            const nextEvent = events[currentEventIndex + 1];
            
            // Intro videosunu preload et
            if (nextEvent.introVideoFile) {
                const introVideo = document.createElement('video');
                introVideo.src = `/videos/${nextEvent.introVideoFile}`;
                introVideo.preload = 'auto';
                preloadVideoRef.current = introVideo;
            }
            
            // Outcome videolarını preload et
            if (nextEvent.correctOutcomeVideo) {
                const correctVideo = document.createElement('video');
                correctVideo.src = `/videos/${nextEvent.correctOutcomeVideo}`;
                correctVideo.preload = 'auto';
            }
            
            if (nextEvent.incorrectOutcomeVideo) {
                const incorrectVideo = document.createElement('video');
                incorrectVideo.src = `/videos/${nextEvent.incorrectOutcomeVideo}`;
                incorrectVideo.preload = 'auto';
            }
        } 
        
        // Cleanup: Önceki preload referanslarını temizle
        return () => {
            if (preloadVideoRef.current) {
                preloadVideoRef.current.src = '';
                preloadVideoRef.current = null;
            }
        };
    }, [currentEventIndex, events, selectedCharacter.id]);

    /**
     * Olay (Soru) Değiştiğinde: Tüm durumu sıfırla ve seçenekleri karıştır
     */
    useEffect(() => {
        // Her yeni olayda tüm state'leri başlangıç durumuna getir
        setSelectedOption(null);
        setShowOutcome(false);
        setLocalSelectedSide(null);
        setIsHovered(null);
        setLocalFeedback(null);
        setIsAnimatingOut(false);
        setVideoFinished(false);

        // Yeni olayda her zaman giriş videosunu göster (varsa)
        setShowingIntro(true);

        document.body.style.overflow = 'auto'; // Kaydırmayı geri aç

        if (currentEvent) {
            // Eğer intro videosu yoksa, introyu atla ve direkt soruyu göster
            if (!currentEvent.introVideoFile) {
                console.warn("Bu olay için 'introVideoFile' ayarlanmamış. Intro atlanıyor.");
                setShowingIntro(false);
            }
            
            // Seçenekleri karıştır (randomize option positions)
            if (currentEvent.options && currentEvent.options.length > 0) {
                const shuffled = [...currentEvent.options].sort(() => Math.random() - 0.5);
                setShuffledOptions(shuffled);
                console.log('🔀 Options shuffled for question:', currentEventIndex + 1);
            }
        }
    }, [currentEventIndex, currentEvent]); // currentEvent de eklendi ki, olayın kendi değiştiğinde tetiklensin


    // *** YENİ EKLENEN FONKSİYON ***
    // Bu fonksiyon bir sonraki olaya geçer
    // veya oyun bittiyse onGameEnd'i çağırır.
    const handleNextEvent = () => {
        setIsAnimatingOut(true); // Önce çıkış animasyonunu tetikle

        setTimeout(() => {
            const nextIndex = currentEventIndex + 1;
            if (nextIndex < events.length) {
                // Sonraki olaya geç
                setCurrentEventIndex(nextIndex);
            } else {
                // Olaylar bitti, oyunu bitir
                console.log("🏁 Tüm olaylar bitti. onGameEnd çağrılıyor.");
                onGameEnd(); // App.js'e oyunun bittiğini bildir
            }
        }, 500); // 500ms animasyon süresi
    };


    /**
     * AŞAMA 3: Kullanıcı bir seçeneğe tıkladığında
     */
    const handleOptionClick = (option, side) => {
        if (selectedOption) {
            console.warn("Zaten bir seçim yapılmış, ikinci tıklama engellendi.");
            return;
        }
       // ... handleOptionClick fonksiyonunun başı ...
        
        // Anlık Geri Bildirim
        // GÜNCELLEME: Sadece 3. soru (index 2) DEĞİLSE geri bildirimi göster
        if (currentEventIndex !== 2) {
            const feedbackText = option.isCorrect ? 'DOĞRU KARAR! ✓' : 'YANLIŞ KARAR ✗';
            const feedbackColor = option.isCorrect ? '#98FF98' : '#FF9999';
            setLocalFeedback({ text: feedbackText, color: feedbackColor });
        }

        setLocalSelectedSide(side); // Hangi tarafın seçildiğini işaretle
// ...
        setLocalSelectedSide(side); // Hangi tarafın seçildiğini işaretle
        setLocalSelectedSide(side); // Hangi tarafın seçildiğini işaretle
        setSelectedOption(option); // Seçilen opsiyonu kaydet
        
        // *** YENİ EKLENEN KISIM ***
        // Karar sonucunu App.js'e bildir
        if (onRecordResult) {
            onRecordResult({
                eventTitle: currentEvent.eventTitle,
                selectedOptionText: option.text,
                isCorrect: option.isCorrect
            });
        }
        // *** EKLEME SONU ***
        
        // Task 4: Kullanıcı cevabını kaydet
        const userAnswer = {
            eventTitle: currentEvent.eventTitle,
            eventId: currentEvent.id,
            selectedText: option.text,
            isCorrect: option.isCorrect,
            timestamp: Date.now()
        };
        
        console.log('💾 Saving user answer:', userAnswer);
        console.log('💾 onSaveUserAnswer function exists:', !!onSaveUserAnswer);
        
        if (onSaveUserAnswer) {
            onSaveUserAnswer(userAnswer);
            console.log('✅ User answer saved successfully');
        } else {
            console.error('❌ onSaveUserAnswer callback is not defined!');
        }

        document.body.style.overflow = 'hidden'; // Vücudun kaydırmasını engelle

        if (audioRef.current) { // Varsa arka plan sesini durdur
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Seçilen seçeneğe göre doğru veya yanlış video yolunu belirle
        const videoYolu = option.isCorrect
            ? currentEvent.correctOutcomeVideo
            : currentEvent.incorrectOutcomeVideo;

        if (!videoYolu) {
            console.error("!!! ÖNEMLİ HATA !!!");
            console.error(`'${option.text}' seçeneği için video yolu bulunamadı.`);
            // ... (diğer console.error'lar)
            
            // Video olmadığı için akışın KİLİTLENMESİNİ ENGELLE:
            setLocalFeedback(null); // Flash mesajı hemen kaldır
            setShowOutcome(true); // Sonuç moduna geç
            setVideoFinished(true); // Videonun bittiğini varsay
            
            // Video yoksa otomatik geçiş yap
            setTimeout(() => {
                handleNextEvent(); // GÜNCELLENDİ
            }, 1500);
            return; // Fonksiyonu burada bitir
        }

        // Normal Akış (Video Bulunduysa)
        setTimeout(() => setLocalFeedback(null), 500); // Anlık geri bildirimi kaldır
        
        setTimeout(() => {
            setShowOutcome(true); // Sonuç videosunu göster
        }, 1000); // 1 saniye sonra
    };

    /**
     * Video yükleme hatalarını yakalayan fonksiyon
     * Video yoksa fallback: otomatik geçiş yap
     */
    const handleVideoError = (error, videoType) => {
        console.warn(`⚠️ Video yükleme hatası (${videoType}):`, error);
        console.warn(`Video yolu kontrol edilmeli: ${error.target?.src || 'bilinmiyor'}`);
        
        // Video tipine göre fallback davranışı
        if (videoType === 'intro') {
            console.warn('Giriş videosu yüklenemedi, soru ekranına geçiliyor...');
            setShowingIntro(false);
        } else if (videoType === 'outcome') {
            console.warn('Sonuç videosu yüklenemedi, otomatik geçiş yapılıyor...');
            setTimeout(() => {
                handleNextEvent(); // GÜNCELLENDİ
            }, 1000);
        }
        // *** 'final' videoType durumu KALDIRILDI ***
    };

    /**
     * AŞAMA 2: Giriş Videosu Bittiğinde
     */
    const handleIntroVideoEnded = () => {
        if (currentEvent.audioFile && audioRef.current) {
            audioRef.current.src = `/audio/${currentEvent.audioFile}`;
            audioRef.current.play().catch(e => console.log("Ses çalınamadı:", e));
        }
        setShowingIntro(false);
    };

    /**
     * AŞAMA 4: Sonuç Videosu Bittiğinde - Otomatik Geçiş
     */
    const handleVideoEnded = () => {
        setVideoFinished(true);
        
        // Video bitiminden 1.5 saniye sonra otomatik geçiş yap
        setTimeout(() => {
            handleNextEvent(); // GÜNCELLENDİ
        }, 1500);
    };

     


    // Video kaynağını ana bileşen seviyesinde belirliyoruz
    const outcomeVideoSource = showOutcome && selectedOption
        ? (selectedOption.isCorrect ? currentEvent.correctOutcomeVideo : currentEvent.incorrectOutcomeVideo)
        : null;

    // *** GÜNCELLENDİ ***
    // handleNextEvent -> onGameEnd() çağrıldığında App.js 'ANALYSIS'e geçer.
    // Bu ekran normalde görünmemeli, ama bir yedek olarak kalması iyi.
    if (!currentEvent) {
        return (
            <div id="game-container" className="game-wrapper" style={{ padding: '100px var(--spacing-sm)' }}>
                <h2 className="event-title">Simülasyon Bitti!</h2>
                <p>Analiz ekranına yönlendiriliyorsunuz...</p>
                <button 
                    className="start-button" 
                    onClick={onGameEnd} // App.js'teki 'ANALYSIS' state'ini tetikler
                    style={{ marginTop: 'var(--spacing-md)' }}
                    aria-label="Analiz ekranına git"
                >
                    Sonuçları Gör <span role="img" aria-label="grafik">📊</span>
                </button>
            </div>
        );
    }



    /**
     * Buton tabanlı seçenek ekranını render eder
     */
    const renderDualOptionScreen = () => {

        const renderOptionButton = (option, index) => {
            if (!option) return null;

            const side = index === 0 ? 'left' : 'right';
            const isCurrentSelected = localSelectedSide === side;
            const isOtherSelected = localSelectedSide && localSelectedSide !== side;

            const parts = option.text.split(':');
            const title = parts.length > 1 ? parts[0] + ':' : option.text;
            const description = parts.length > 1 ? parts.slice(1).join(':').trim() : '';

            const isOutcomeVisible = showOutcome && isCurrentSelected;
            
            // Standardized color for both buttons (no color bias)
            const themeColor = 'rgba(30, 30, 30, 0.95)';

            return (
                <button
                    key={index}
                    className="option-button-3d"
                    onClick={() => !showOutcome && !localSelectedSide && handleOptionClick(option, side)}
                    onMouseEnter={() => setIsHovered(side)}
                    onMouseLeave={() => setIsHovered(null)}
                    onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !showOutcome && !localSelectedSide) {
                            e.preventDefault();
                            handleOptionClick(option, side);
                        }
                    }}
                    disabled={localSelectedSide !== null}
                    aria-label={`Seçenek ${index + 1}: ${title}`}
                    aria-disabled={localSelectedSide !== null}
                    role="button"
                    tabIndex={localSelectedSide ? -1 : 0}
                    style={{
                        flex: 1,
                        minHeight: '200px',
                        padding: '2rem',
                        background: `linear-gradient(${themeColor}, ${themeColor})`,
                        border: '2px solid rgba(50, 50, 50, 0.5)',
                        borderRadius: 'var(--radius-md)',
                        cursor: localSelectedSide ? 'default' : 'pointer',
                        opacity: isOtherSelected ? 0.3 : 1,
                        color: 'var(--text-light)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                    }}
                >
                    {!isOutcomeVisible && (
                        <>
                            <h3 style={{
                                fontSize: '1.8em',
                                fontWeight: '800',
                                marginBottom: 'var(--spacing-xs)',
                                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3), 4px 4px 0px rgba(0, 0, 0, 0.2), 6px 6px 0px rgba(0, 0, 0, 0.1), 8px 8px 12px rgba(0, 0, 0, 0.4)',
                            }}>
                                {title}
                            </h3>
                            {description && (
                                <p style={{
                                    fontSize: '1.1em',
                                    fontWeight: '500',
                                    opacity: 0.9,
                                    lineHeight: 1.5,
                                    textShadow: '1px 1px 0px rgba(0, 0, 0, 0.3), 2px 2px 0px rgba(0, 0, 0, 0.2), 3px 3px 6px rgba(0, 0, 0, 0.3)',
                                }}>
                                    {description}
                                </p>
                            )}
                        </>
                    )}
                </button>
            );
        };

        return (
            <div
                className="options-container"
                role="group"
                aria-label="Cevap seçenekleri"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: 'var(--spacing-lg) auto',
                    padding: '0 var(--spacing-md)',
                    opacity: isAnimatingOut ? 0 : 1,
                    transform: 'translateY(0)',
                    transition: 'opacity var(--transition-slow), transform var(--transition-slow)',
                    animation: 'fadeInUp 0.8s ease-out 0.5s',
                    animationFillMode: 'backwards'
                }}
            >
                {shuffledOptions.map((option, index) => renderOptionButton(option, index))}

                {/* ANLIK GERİ BİLDİRİM (flash mesajı) */}
                {localFeedback && (
                    <div 
                        role="alert" 
                        aria-live="assertive"
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2000,
                            fontSize: '3em',
                            fontWeight: 'bold',
                            color: localFeedback.color,
                            background: 'var(--glass-bg)',
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: `0 0 30px ${localFeedback.color}`,
                            animation: 'flash 0.5s ease-out'
                        }}
            _       >
                        {localFeedback.text}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="game-wrapper" style={{display: 'flex', flexDirection: 'column' }}>

             
            {/* AŞAMA 1: GİRİŞ VİDEOSU (Her olayın başında, varsa) */}
            {showingIntro && currentEvent && currentEvent.introVideoFile && (
                <IntroVideoPlayer
                    videoSrc={`/videos/${currentEvent.introVideoFile}`}
                    onEnded={handleIntroVideoEnded}
                    onError={(e) => handleVideoError(e, 'intro')}
                />
            )}

            {/* AŞAMA 4: SONUÇ VİDEOSU OYNATICI (Tam ekran, showOutcome true olduğunda) */}
            {outcomeVideoSource && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1998, // Butonların (2001) altında kalmalı
                    background: '#000',
                    animation: 'fadeIn 0.5s'
                }}>
                    <video
                        autoPlay
                        playsInline
                        src={`/videos/${outcomeVideoSource}`}
                        key={outcomeVideoSource} 
                        onEnded={handleVideoEnded}
                        onError={(e) => handleVideoError(e, 'outcome')}
                        aria-label="Seçim sonucu videosu"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: videoFinished ? 'brightness(0.5)' : 'brightness(1)', // Video bitince karart
                            transition: 'filter 1s ease'
                        }}
                    >
                        Video yüklenemedi.
                    </video>
                </div>
            )}

            {/* AŞAMA 2: SORU EKRANI (Intro bitince ve henüz seçenek seçilmemişse görünür) */}
            {(!showingIntro && !localSelectedSide) && (
                <div id="game-container" role="main" aria-live="polite" style={{
                    flexGrow: 1,
                    transition: 'opacity var(--transition-normal)',
                    opacity: isAnimatingOut ? 0 : 1,
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <h2 className="event-title" role="heading" aria-level="1">
                        <span style={{ color: 'var(--text-dark)', fontSize: '0.6em', fontWeight: 500 }}>Olay {currentEventIndex + 1} / {events.length}: </span>
                        <br />
                        {currentEvent.eventTitle}
                    </h2>
                    <p className="question-text" role="text">
                        {selectedCharacter.name} olarak karşılaştığınız kritik durum:
                        <br />
                        {currentEvent.eventContext}
                    </p>
                    <audio ref={audioRef} style={{ display: 'none' }} aria-hidden="true" />
                </div>
            )}

            {/* AŞAMA 3 & 4: SEÇENEKLER ve SONUÇ EKRANI (Intro bitince görünür) */}
            {(!showingIntro) && renderDualOptionScreen()}



            {/* CSS Animasyonları */}
            <style>{`
                @keyframes flash {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Accessibility: Focus indicators (Task 11) */
                .option-button-3d:focus {
                    outline: 3px solid var(--primary-gold);
                    outline-offset: 4px;
                    box-shadow: 
                        0 0 0 4px rgba(255, 215, 0, 0.3),
                        0 20px 60px rgba(0, 0, 0, 0.5);
                }

                .option-button-3d:focus:not(:focus-visible) {
                    outline: none;
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.5);
                }

                .option-button-3d:focus-visible {
                    outline: 3px solid var(--primary-gold);
                    outline-offset: 4px;
                    box-shadow: 
                        0 0 0 4px rgba(255, 215, 0, 0.3),
                        0 20px 60px rgba(0, 0, 0, 0.5);
A             }

                /* Responsive Design - Mobile Optimization (Task 10) */
                @media (max-width: 768px) {
                    /* Butonları mobile'da dikey (column) düzenle */
                    .options-container {
                        flex-direction: column !important;
                        gap: 1.5rem !important;
                        padding: 0 var(--spacing-sm) !important;
A                 }
                    
                    /* 3D efektleri mobile'da azalt (performans için) */
                    .option-button-3d {
                        transform: perspective(800px) translateZ(10px) !important;
                        box-shadow: 
                            0 5px 15px rgba(0, 0, 0, 0.3),
                            0 1px 4px rgba(0, 0, 0, 0.2) !important;
                        min-height: 150px !important;
                        padding: 1.5rem !important;
                    }
                    
                    /* Touch event'leri için hover yerine active state kullan */
                    .option-button-3d:hover:not(:disabled) {
                        transform: perspective(800px) translateZ(10px) !important;
D                     box-shadow: 
                            0 5px 15px rgba(0, 0, 0, 0.3),
                            0 1px 4px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .option-button-3d:active:not(:disabled) {
                        transform: perspective(800px) translateY(-4px) translateZ(15px) scale(1.02) !important;
                        box-shadow: 
                            0 10px 20px rgba(0, 0, 0, 0.4),
                            0 3px 8px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    /* Başlık ve açıklama font boyutlarını ayarla */
                    .option-button-3d h3 {
                        font-size: 1.4em !important;
                        text-shadow: 
                            1px 1px 0px rgba(0, 0, 0, 0.3),
                            2px 2px 0px rgba(0, 0, 0, 0.2),
                            3px 3px 6px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    .option-button-3d p {
                        font-size: 1em !important;
                        text-shadow: 
                            1px 1px 0px rgba(0, 0, 0, 0.3),
                            2px 2px 4px rgba(0, 0, 0, 0.2) !important;
                    }
                }
                
                /* Reduced motion support */
s             @media (prefers-reduced-motion: reduce) {
                    .option-button-3d,
                    .option-button-3d:hover,
                    .option-button-3d:active {
                        transform: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Game;