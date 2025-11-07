import React, { useState } from 'react';
import { CHARACTERS } from '../data/characters';

function CharacterSelection({ onSelectCharacter }) {
    const [hoveredChar, setHoveredChar] = useState(null);
    const [selectedChar, setSelectedChar] = useState(null);

    const handleSelect = (char) => {
        if (selectedChar) return; 

        setSelectedChar(char);
        
        setTimeout(() => {
            onSelectCharacter(char);
        }, 1500); 
    };
    
    const handleMouseEnter = (index) => {
        if (!selectedChar) {
            setHoveredChar(index);
        }
    };

    const handleMouseLeave = () => {
        if (!selectedChar) {
            setHoveredChar(null);
        }
    };

    return (
        <div className="game-wrapper" style={{
            padding: 0,
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>
            {/* Blurred background layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/Gemini_Generated_Image_dr5rdcdr5rdcdr5r.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
                zIndex: -1
            }} />
            
            <div id="game-container" style={{
                maxWidth: '100%', 
                padding: 0, 
                background: 'transparent', 
                margin: 0,
                position: 'relative',
                zIndex: 1
            }}>
                
                <div role="banner" style={{padding: 'var(--spacing-xl) var(--spacing-xl) var(--spacing-md)', backgroundColor: 'rgba(30, 30, 30, 0.95)'}}>
                    <h2 className="event-title" role="heading" aria-level="1" style={{fontSize: '2.8em', marginBottom: 'var(--spacing-sm)'}}>Kahramanınızı Seçin</h2>
                    <p className="question-text" role="text" style={{fontSize: '1.3em', marginBottom: '0'}}>
                        Hangi liderin tarihi kararlarına rehberlik edeceksiniz?
                    </p>
                </div>

                <div className="character-cards-container" role="group" aria-label="Karakter seçenekleri" style={{
                    minHeight: 'calc(100vh - 200px)',
                    padding: 'var(--spacing-md) var(--spacing-sm)', 
                }}>
                    {CHARACTERS.map((char, index) => {
                        const isHovered = hoveredChar === index;
                        const isSelected = selectedChar?.id === char.id;
                        
                        return (
                            <div
                                key={char.id}
                                className={`character-card ${isSelected ? 'is-selected' : ''}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleSelect(char)}
                                onKeyDown={(e) => {
                                    if ((e.key === 'Enter' || e.key === ' ') && !selectedChar) {
                                        e.preventDefault();
                                        handleSelect(char);
                                    }
                                }}
                                role="button"
                                tabIndex={selectedChar ? -1 : 0}
                                aria-label={`${char.name} - ${char.title}: ${char.description}`}
                                aria-pressed={isSelected}
                                style={{
                                    backgroundImage: `url(${char.image_url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center top',
                                }}
                            >
                                <div className="card-text-overlay" aria-hidden="true">
                                    <h3 className="character-name">
                                        {char.name}
                                    </h3>
                                    <p className="character-title">
                                        {char.title}
                                    </p>
                                    <p className="card-description" style={{
                                        opacity: isHovered || isSelected ? 1 : 0,
                                        maxHeight: isHovered || isSelected ? '100px' : '0',
                                        transition: 'all 0.5s ease'
                                    }}>
                                        {char.description}
                                    </p>

                                    {isHovered && !selectedChar && (
                                        <button 
                                            className="start-button" 
                                            style={{fontSize: '1.1em', padding: 'var(--spacing-xs) var(--spacing-md)'}}
                                            tabIndex={-1}
                                            aria-hidden="true"
                                        >
                                            BU KAHRAMANI SEÇ
                                        </button>
                                    )}
                                    {isSelected && (
                                        <p className="character-title" role="status" aria-live="polite" aria-hidden="false" style={{fontSize: '1.2em', color: 'var(--primary-gold)', marginTop: 'var(--spacing-xs)', animation: 'pulse 1s infinite'}}>
                                            Seçim Onaylandı! Başlatılıyor...
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CharacterSelection;