import { useState, useEffect, useRef } from 'react';
import { GAME_EVENTS } from '../data/events';

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

const Game = ({ selectedCharacter, onGameEnd, onRecordResult, onSaveUserAnswer, userAnswers = [] }) => {
    console.log('🎮 Game Component Rendered');
    console.log('📊 userAnswers prop:', userAnswers);
    
    const events = GAME_EVENTS[selectedCharacter.id] || [];
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOutcome, setShowOutcome] = useState(false);
    const [localSelectedSide, setLocalSelectedSide] = useState(null);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [localFeedback, setLocalFeedback] = useState(null);
    const [showingIntro, setShowingIntro] = useState(true);
    const [videoFinished, setVideoFinished] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const audioRef = useRef(null);
    const currentEvent = events[currentEventIndex];
    const preloadVideoRef = useRef(null);
    
    useEffect(() => {
        console.log('🔄 userAnswers changed:', userAnswers);
    }, [userAnswers]);

    useEffect(() => {
        if (currentEventIndex < events.length - 1) {
            const nextEvent = events[currentEventIndex + 1];
            
            if (nextEvent.introVideoFile) {
                const introVideo = document.createElement('video');
                introVideo.src = `/videos/${nextEvent.introVideoFile}`;
                introVideo.preload = 'auto';
                preloadVideoRef.current = introVideo;
            }
            
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
        
        return () => {
            if (preloadVideoRef.current) {
                preloadVideoRef.current.src = '';
                preloadVideoRef.current = null;
            }
        };
    }, [currentEventIndex, events, selectedCharacter.id]);

    useEffect(() => {
        setSelectedOption(null);
        setShowOutcome(false);
        setLocalSelectedSide(null);
        setLocalFeedback(null);
        setIsAnimatingOut(false);
        setVideoFinished(false);
        setShowingIntro(true);

        document.body.style.overflow = 'auto';

        if (currentEvent) {
            if (!currentEvent.introVideoFile) {
                console.warn("Bu olay için 'introVideoFile' ayarlanmamış. Intro atlanıyor.");
                setShowingIntro(false);
            }
            
            if (currentEvent.options && currentEvent.options.length > 0) {
                const shuffled = [...currentEvent.options].sort(() => Math.random() - 0.5);
                setShuffledOptions(shuffled);
                console.log('🔀 Options shuffled for question:', currentEventIndex + 1);
            }
        }
    }, [currentEventIndex, currentEvent]);

    const handleNextEvent = () => {
        setIsAnimatingOut(true);

        setTimeout(() => {
            const nextIndex = currentEventIndex + 1;
            if (nextIndex < events.length) {
                setCurrentEventIndex(nextIndex);
            } else {
                console.log("🏁 Tüm olaylar bitti. onGameEnd çağrılıyor.");
                onGameEnd();
            }
        }, 500);
    };

    const handleOptionClick = (option, side) => {
        if (selectedOption) {
            console.warn("Zaten bir seçim yapılmış, ikinci tıklama engellendi.");
            return;
        }
        
        const isCharacterQuestion = currentEvent.questionType === 'character';
        
        if (!isCharacterQuestion) {
            const feedbackText = option.isCorrect ? 'DOĞRU KARAR! ✓' : 'YANLIŞ KARAR ✗';
            const feedbackColor = option.isCorrect ? '#98FF98' : '#FF9999';
            setLocalFeedback({ text: feedbackText, color: feedbackColor });
        }

        setLocalSelectedSide(side);
        setSelectedOption(option);
        
        if (onRecordResult) {
            onRecordResult({
                eventTitle: currentEvent.eventTitle,
                selectedOptionText: option.text,
                isCorrect: isCharacterQuestion ? null : option.isCorrect,
                questionType: currentEvent.questionType,
                characterTrait: option.characterTrait
            });
        }
        
        const userAnswer = {
            eventTitle: currentEvent.eventTitle,
            eventId: currentEvent.id,
            selectedText: option.text,
            isCorrect: isCharacterQuestion ? null : option.isCorrect,
            questionType: currentEvent.questionType,
            characterTrait: option.characterTrait,
            timestamp: Date.now()
        };
        
        console.log('💾 Saving user answer:', userAnswer);
        
        if (onSaveUserAnswer) {
            onSaveUserAnswer(userAnswer);
            console.log('✅ User answer saved successfully');
        } else {
            console.error('❌ onSaveUserAnswer callback is not defined!');
        }

        document.body.style.overflow = 'hidden';

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const videoYolu = isCharacterQuestion
            ? currentEvent.correctOutcomeVideo
            : (option.isCorrect ? currentEvent.correctOutcomeVideo : currentEvent.incorrectOutcomeVideo);

        if (!videoYolu) {
            console.error("!!! ÖNEMLİ HATA !!!");
            console.error(`'${option.text}' seçeneği için video yolu bulunamadı.`);
            
            setLocalFeedback(null);
            setShowOutcome(true);
            setVideoFinished(true);
            
            setTimeout(() => {
                handleNextEvent();
            }, 1500);
            return;
        }

        if (!isCharacterQuestion) {
            setTimeout(() => setLocalFeedback(null), 500);
        }
        
        setTimeout(() => {
            setShowOutcome(true);
        }, isCharacterQuestion ? 500 : 1000);
    };

    const handleVideoError = (error, videoType) => {
        console.warn(`⚠️ Video yükleme hatası (${videoType}):`, error);
        
        if (videoType === 'intro') {
            console.warn('Giriş videosu yüklenemedi, soru ekranına geçiliyor...');
            setShowingIntro(false);
        } else if (videoType === 'outcome') {
            console.warn('Sonuç videosu yüklenemedi, otomatik geçiş yapılıyor...');
            setTimeout(() => {
                handleNextEvent();
            }, 1000);
        }
    };

    const handleIntroVideoEnded = () => {
        if (currentEvent.audioFile && audioRef.current) {
            audioRef.current.src = `/audio/${currentEvent.audioFile}`;
            audioRef.current.play().catch(e => console.log("Ses çalınamadı:", e));
        }
        setShowingIntro(false);
    };

    const handleVideoEnded = () => {
        setVideoFinished(true);
        
        setTimeout(() => {
            handleNextEvent();
        }, 1500);
    };

    const outcomeVideoSource = showOutcome && selectedOption
        ? (selectedOption.isCorrect ? currentEvent.correctOutcomeVideo : currentEvent.incorrectOutcomeVideo)
        : null;

    if (!currentEvent) {
        return (
            <div id="game-container" className="game-wrapper" style={{ padding: '100px var(--spacing-sm)' }}>
                <h2 className="event-title">Simülasyon Bitti!</h2>
                <p>Analiz ekranına yönlendiriliyorsunuz...</p>
                <button 
                    className="start-button" 
                    onClick={onGameEnd}
                    style={{ marginTop: 'var(--spacing-md)' }}
                    aria-label="Analiz ekranına git"
                >
                    Sonuçları Gör <span role="img" aria-label="grafik">📊</span>
                </button>
            </div>
        );
    }

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
            const themeColor = 'rgba(30, 30, 30, 0.95)';

            return (
                <button
                    key={index}
                    className="option-button-3d"
                    onClick={() => !showOutcome && !localSelectedSide && handleOptionClick(option, side)}
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
                                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3), 4px 4px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                {title}
                            </h3>
                            {description && (
                                <p style={{
                                    fontSize: '1.1em',
                                    fontWeight: '500',
                                    opacity: 0.9,
                                    lineHeight: 1.5,
                                    textShadow: '1px 1px 0px rgba(0, 0, 0, 0.3)',
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
                    >
                        {localFeedback.text}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="game-wrapper" style={{display: 'flex', flexDirection: 'column' }}>
            {showingIntro && currentEvent && currentEvent.introVideoFile && (
                <IntroVideoPlayer
                    videoSrc={`/videos/${currentEvent.introVideoFile}`}
                    onEnded={handleIntroVideoEnded}
                    onError={(e) => handleVideoError(e, 'intro')}
                />
            )}

            {outcomeVideoSource && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1998,
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
                            filter: videoFinished ? 'brightness(0.5)' : 'brightness(1)',
                            transition: 'filter 1s ease'
                        }}
                    >
                        Video yüklenemedi.
                    </video>
                </div>
            )}

            {(!showingIntro && !localSelectedSide) && (
                <div id="game-container" role="main" aria-live="polite" style={{
                    flexGrow: 1,
                    transition: 'opacity var(--transition-normal)',
                    opacity: isAnimatingOut ? 0 : 1,
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <h2 className="event-title" role="heading" aria-level="1">
                        <span style={{ color: 'var(--text-dark)', fontSize: '0.6em', fontWeight: 500 }}>
                            Olay {currentEventIndex + 1} / {events.length}: 
                        </span>
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

            {(!showingIntro) && renderDualOptionScreen()}
        </div>
    );
}

export default Game;
