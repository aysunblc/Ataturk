import React from 'react';

/**
 * ScoreCard Sub-component
 * Displays the overall score with percentage, correct/incorrect counts
 */
const ScoreCard = ({ finalScore, getFeedbackMessage }) => {
    const { correct, incorrect, total, percentage } = finalScore;
    
    return (
        <div className="score-card-3d" role="region" aria-label="Skor kartı" style={{
            background: 'var(--glass-bg)',
            border: '2px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-lg)',
            textAlign: 'center',
            // 3D effects
            transform: 'perspective(1000px) translateZ(30px)',
            boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.1),
                inset 0 -2px 0 rgba(0, 0, 0, 0.2)
            `,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            animation: 'fadeInUp 0.8s ease-out'
        }}>
            <h2 role="heading" aria-level="1" style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--text-light)',
                marginBottom: 'var(--spacing-md)',
                textShadow: `
                    2px 2px 0px rgba(0, 0, 0, 0.3),
                    4px 4px 0px rgba(0, 0, 0, 0.2),
                    6px 6px 0px rgba(0, 0, 0, 0.1)
                `
            }}>
                Simülasyon Tamamlandı!
            </h2>
            
            <div className="score-circle" role="img" aria-label={`Başarı oranı yüzde ${percentage}`} style={{
                width: '200px',
                height: '200px',
                margin: '0 auto var(--spacing-lg) auto',
                borderRadius: '50%',
                background: `conic-gradient(
                    var(--primary-gold) 0% ${percentage}%,
                    rgba(255, 255, 255, 0.1) ${percentage}% 100%
                )`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                // 3D effects
                transform: 'translateZ(20px)',
                boxShadow: `
                    0 10px 30px rgba(0, 0, 0, 0.4),
                    inset 0 0 0 15px var(--dark-bg)
                `
            }}>
                <span className="percentage" aria-hidden="true" style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: 'var(--primary-gold)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                    {percentage}%
                </span>
            </div>
            
            <div className="score-details" role="group" aria-label="Skor detayları" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(var(--spacing-lg), 5vw, var(--spacing-xl))',
                marginBottom: 'var(--spacing-lg)',
                flexWrap: 'wrap'
            }}>
                <div role="status" aria-label={`Doğru cevaplar: ${correct} / ${total}`} style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'rgba(152, 255, 152, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid rgba(152, 255, 152, 0.3)',
                    // 3D effects
                    transform: 'translateZ(10px)',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}>
                    <p aria-hidden="true" style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#98FF98',
                        margin: 0
                    }}>
                        Doğru: {correct} / {total}
                    </p>
                </div>
                
                <div role="status" aria-label={`Yanlış cevaplar: ${incorrect} / ${total}`} style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'rgba(255, 153, 153, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid rgba(255, 153, 153, 0.3)',
                    // 3D effects
                    transform: 'translateZ(10px)',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}>
                    <p aria-hidden="true" style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#FF9999',
                        margin: 0
                    }}>
                        Yanlış: {incorrect} / {total}
                    </p>
                </div>
            </div>
            
            <p className="feedback-message" role="status" aria-live="polite" style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: 'var(--primary-gold)',
                margin: 0,
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
                {getFeedbackMessage(percentage)}
            </p>
        </div>
    );
};

/**
 * AnswerReview Sub-component
 * Displays a list of all user answers with correct/incorrect indicators
 */
const AnswerReview = ({ userAnswers }) => {
    return (
        <div className="answer-review-3d" role="region" aria-label="Cevap incelemesi" style={{
            background: 'var(--glass-bg)',
            border: '2px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-lg)',
            // 3D effects
            transform: 'perspective(1000px) translateZ(20px)',
            boxShadow: `
                0 15px 45px rgba(0, 0, 0, 0.4),
                0 8px 20px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            willChange: 'transform',
            animation: 'fadeInUp 0.8s ease-out 0.2s',
            animationFillMode: 'backwards'
        }}>
            <h3 role="heading" aria-level="2" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--text-light)',
                marginBottom: 'var(--spacing-md)',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
                Cevaplarınız
            </h3>
            
            <div role="list" aria-label="Cevap listesi" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)'
            }}>
                {userAnswers.map((answer, index) => (
                    <div
                        key={index}
                        role="listitem"
                        aria-label={`Soru ${index + 1}: ${answer.eventTitle}, Cevabınız: ${answer.selectedText}, ${answer.isCorrect ? 'Doğru' : 'Yanlış'}`}
                        className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr auto auto',
                            gap: 'var(--spacing-sm)',
                            alignItems: 'center',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            background: answer.isCorrect 
                                ? 'rgba(152, 255, 152, 0.05)' 
                                : 'rgba(255, 153, 153, 0.05)',
                            border: `2px solid ${answer.isCorrect 
                                ? 'rgba(152, 255, 152, 0.3)' 
                                : 'rgba(255, 153, 153, 0.3)'}`,
                            borderRadius: 'var(--radius-sm)',
                            // 3D effects
                            transform: 'translateZ(5px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateZ(10px) translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateZ(5px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <span className="question-number" aria-hidden="true" style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: 'var(--primary-gold)',
                            minWidth: '80px'
                        }}>
                            Soru {index + 1}
                        </span>
                        
                        <span className="question-title" aria-hidden="true" style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-light)'
                        }}>
                            {answer.eventTitle}
                        </span>
                        
                        <span className="user-answer" aria-hidden="true" style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-dark)',
                            fontStyle: 'italic',
                            textAlign: 'right'
                        }}>
                            {answer.selectedText.length > 50 
                                ? answer.selectedText.substring(0, 50) + '...' 
                                : answer.selectedText}
                        </span>
                        
                        <span className="result-icon" role="img" aria-label={answer.isCorrect ? 'Doğru' : 'Yanlış'} style={{
                            fontSize: '1.5rem',
                            fontWeight: '900',
                            color: answer.isCorrect ? '#98FF98' : '#FF9999',
                            minWidth: '30px',
                            textAlign: 'center'
                        }}>
                            {answer.isCorrect ? '✓' : '✗'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * ActionButtons Sub-component
 * Displays "Ana Menüye Dön" and "Tekrar Oyna" buttons
 */
const ActionButtons = ({ onGameEnd, onRestart }) => {
    return (
        <div className="action-buttons" role="group" aria-label="Aksiyon butonları" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(var(--spacing-md), 3vw, var(--spacing-xl))',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.4s',
            animationFillMode: 'backwards'
        }}>
            <button
                className="action-button-3d"
                onClick={onGameEnd}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onGameEnd();
                    }
                }}
                aria-label="Ana menüye dön"
                role="button"
                tabIndex={0}
                style={{
                    padding: 'var(--spacing-sm) var(--spacing-xl)',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--primary-gold)',
                    background: 'transparent',
                    border: '2px solid var(--primary-gold)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    // 3D effects
                    transform: 'perspective(1000px) translateZ(15px)',
                    boxShadow: `
                        0 8px 20px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 215, 0, 0.2)
                    `,
                    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) translateZ(25px) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.background = 'var(--primary-gold)';
                    e.currentTarget.style.color = 'var(--dark-bg)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) translateZ(15px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--primary-gold)';
                }}
            >
                Ana Menüye Dön 🏠
            </button>
            
            <button
                className="action-button-3d"
                onClick={onRestart}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRestart();
                    }
                }}
                aria-label="Oyunu yeniden başlat"
                role="button"
                tabIndex={0}
                style={{
                    padding: 'var(--spacing-sm) var(--spacing-xl)',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--text-light)',
                    background: 'var(--primary-red)',
                    border: '2px solid var(--primary-red)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    // 3D effects
                    transform: 'perspective(1000px) translateZ(15px)',
                    boxShadow: `
                        0 8px 20px rgba(183, 15, 10, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) translateZ(25px) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(183, 15, 10, 0.5)';
                    e.currentTarget.style.background = '#E01A10';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) translateZ(15px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(183, 15, 10, 0.4)';
                    e.currentTarget.style.background = 'var(--primary-red)';
                }}
            >
                Yeniden Başla 🔄
            </button>
        </div>
    );
};

/**
 * Main ScoreAnalysisScreen Component
 * Displays the complete score analysis with all sub-components
 */
const ScoreAnalysisScreen = ({ finalScore, userAnswers, onGameEnd, onRestart, getFeedbackMessage }) => {
    return (
        <div className="score-analysis-screen" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/score-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 3000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 'var(--spacing-xl) var(--spacing-lg)',
            boxSizing: 'border-box',
            overflowY: 'auto',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            {/* Blur overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background: 'rgba(18, 18, 18, 0.75)',
                zIndex: -1
            }} />
            <div style={{
                maxWidth: '1600px',
                width: '100%',
                padding: 'var(--spacing-lg) 0',
                position: 'relative',
                zIndex: 1
            }}>
                <ScoreCard 
                    finalScore={finalScore} 
                    getFeedbackMessage={getFeedbackMessage}
                />
                
                <AnswerReview userAnswers={userAnswers} />
                
                <ActionButtons 
                    onGameEnd={onGameEnd}
                    onRestart={onRestart}
                />
            </div>
            
            {/* CSS Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                

                
                /* Mobile responsive adjustments (Task 10) */
                @media (max-width: 768px) {
                    /* Reduce 3D effects on mobile for performance */
                    .score-card-3d,
                    .answer-review-3d {
                        transform: perspective(800px) translateZ(10px) !important;
                        box-shadow: 
                            0 8px 20px rgba(0, 0, 0, 0.4),
                            0 4px 10px rgba(0, 0, 0, 0.3) !important;
                        padding: var(--spacing-md) !important;
                    }
                    
                    /* Reduce score circle size on mobile */
                    .score-circle {
                        width: 150px !important;
                        height: 150px !important;
                        transform: translateZ(5px) !important;
                        box-shadow: 
                            0 5px 15px rgba(0, 0, 0, 0.4),
                            inset 0 0 0 12px var(--dark-bg) !important;
                    }
                    
                    .percentage {
                        font-size: 2.5rem !important;
                    }
                    
                    /* Stack score details vertically on mobile */
                    .score-details {
                        flex-direction: column !important;
                        gap: var(--spacing-sm) !important;
                    }
                    
                    .score-details > div {
                        transform: translateZ(5px) !important;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    /* Simplify answer item layout for mobile */
                    .answer-item {
                        grid-template-columns: 1fr !important;
                        text-align: center !important;
                        gap: var(--spacing-xs) !important;
                        transform: translateZ(3px) !important;
                        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .answer-item span {
                        text-align: center !important;
                    }
                    
                    /* Touch event'leri için hover yerine active state kullan */
                    .answer-item:hover {
                        transform: translateZ(3px) !important;
                        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .answer-item:active {
                        transform: translateZ(5px) translateY(-2px) !important;
                        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    /* Action buttons mobile optimization */
                    .action-button-3d {
                        width: 100%;
                        transform: perspective(800px) translateZ(8px) !important;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    /* Touch event'leri için hover yerine active state kullan */
                    .action-button-3d:hover {
                        transform: perspective(800px) translateZ(8px) !important;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
                    }
                    
                    .action-button-3d:active {
                        transform: perspective(800px) translateZ(12px) translateY(-3px) !important;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4) !important;
                    }
                    
                    /* Reduce text sizes on mobile */
                    .score-card-3d h2 {
                        font-size: 2rem !important;
                        text-shadow: 
                            1px 1px 0px rgba(0, 0, 0, 0.3),
                            2px 2px 0px rgba(0, 0, 0, 0.2),
                            3px 3px 4px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .answer-review-3d h3 {
                        font-size: 1.5rem !important;
                    }
                    
                    .feedback-message {
                        font-size: 1.1rem !important;
                    }
                }
                
                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .score-card-3d,
                    .answer-review-3d,
                    .action-button-3d,
                    .answer-item {
                        transform: none !important;
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* Accessibility: Focus indicators (Task 11) */
                .action-button-3d:focus {
                    outline: 3px solid var(--primary-gold);
                    outline-offset: 4px;
                    box-shadow: 
                        0 0 0 4px rgba(255, 215, 0, 0.3),
                        0 15px 35px rgba(0, 0, 0, 0.4);
                }

                .action-button-3d:focus:not(:focus-visible) {
                    outline: none;
                }

                .action-button-3d:focus-visible {
                    outline: 3px solid var(--primary-gold);
                    outline-offset: 4px;
                    box-shadow: 
                        0 0 0 4px rgba(255, 215, 0, 0.3),
                        0 15px 35px rgba(0, 0, 0, 0.4);
                }

                .answer-item:focus {
                    outline: 2px solid var(--primary-gold);
                    outline-offset: 2px;
                }
            `}</style>
        </div>
    );
};

export default ScoreAnalysisScreen;
