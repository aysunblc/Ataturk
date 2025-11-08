export const GAME_EVENTS = {
    inonu: [
        // --- EVENT 1: NORMAL QUIZ SORUSU ---
        {
            id: 'inonu-1-anadolu-gecis',
   
            introVideoFile: 'ilkintro.mp4', 
            questionType: 'quiz', // Normal quiz sorusu
           
            eventTitle: 'Milli Mücadelenin Başlangıcı: Anadoluya Geçiş Kararı',
            eventContext: '1 Ocak 1921. Eskişehirin doğusunda sisli bir sabah. Yeni kurulmuş ordunun morali kırılmak üzere. Komutan olarak biliyorsun: Bu karar, sadece bugünü değil, ordunun geleceğini belirleyecek. Ne yapardın?',
            options: [
                {
                    text: 'Seçenek: Birlikleri geri çek, yeniden düzenle. "Kaybettiğin bir mevziyi geri alırsın, ama dağılan bir orduyu yeniden kuramazsın."',
                    isCorrect: false,
                },
                {
                    text: 'Seçenek: Mevzide kal, diren, orduya güven ver. "Cesaret bulaşıcıdır; geri adım atmazsan asker de atmaz."',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: '1a.mp4', 
            incorrectOutcomeVideo: '1b.mp4', 
        },
        
        // --- EVENT 2: NORMAL QUIZ SORUSU ---
        {
            id: 'inonu-2-birinci-inonu',
            introVideoFile: '2intro.mp4',
            questionType: 'quiz', // Normal quiz sorusu
            
            eventTitle: 'Lozan Müzakereleri',
            eventContext: 'Lozan Antlaşması müzakerelerinde karar senin. Ne yaparsın?',
            options: [
                {
                    text: 'Sert çıkış yap, taviz verme',
                    isCorrect: false,
                },
                {
                    text: 'Sakin kal, zamanı bekle.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: '2a.mp4', 
            incorrectOutcomeVideo: '2b.mp4', 
        },

        // --- EVENT 3: KARAKTER ANALİZİ SORUSU ---
        {
            id: 'inonu-3-character-analysis',
            introVideoFile: 'intro3.mp4',
            questionType: 'character', // Karakter analizi sorusu
            
            eventTitle: 'Liderlik Tarzın',
            eventContext: 'Zorluk anında nasıl bir lider olurdun?',
            options: [
                {
                    text: 'Seçenek: Cesur, risk alarak öne çıkan lider',
                    characterTrait: 'bold', // Karakter özelliği
                },
                {
                    text: 'Seçenek: Soğukkanlı, plan yaparak ilerleyen lider',
                    characterTrait: 'strategic', // Karakter özelliği
                },
            ],
            correctOutcomeVideo: '3a.mp4',
            incorrectOutcomeVideo: '3b.mp4',
        },
    ],
    
    // Diğer karakterler için eventler
    kazimkarabekir: [
        {
            id: 'karabekir-placeholder',
            finalVideo: 'final-karabekir.mp4',
        }
    ],
    fevzicakmak: [
        {
            id: 'cakmak-placeholder',
            finalVideo: 'final-cakmak.mp4',
        }
    ],
};
