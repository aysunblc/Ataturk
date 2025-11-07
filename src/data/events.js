export const GAME_EVENTS = {
    inonu: [
        // --- EVENT 1 (Mevcut Olayın) ---
        {
            id: 'inonu-1-anadolu-gecis',
            finalVideo: 'final-inonu.mp4', // Final video for İsmet İnönü character
            introVideoFile: 'new.mp4', 
           
            eventTitle: 'Milli Mücadelenin Başlangıcı: Anadolu\'ya Geçiş Kararı',
            eventContext: 'İstanbul işgal altında. Mustafa Kemal Paşa sizi Anadolu\'ya çağırıyor. Ne yapacaksınız?',
            options: [
                {
                    text: 'Seçenek : İstanbul\'da Kalıp Diploması Yürütmek. Padişah\'ın yanında kalıp durumu içeriden çözmeyi denemek.',
                    isCorrect: false,
                },
                {
                    text: 'Seçenek : Anadolu\'ya Geçerek Direnişi Örgütlemek. Tüm rütbeleri bırakıp Milli Mücadele\'ye katılmak.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'deneme.mp4', 
            incorrectOutcomeVideo: 'new.mp4', 
          
        },
        
        // --- EVENT 2 (Mevcut Olayın) ---
        {
            id: 'inonu-2-birinci-inonu',
            introVideoFile: 'olsun.mp4', 
            
            
            eventContext: '“Lozan Antlaşması müzakerelerinde karar senin. Ne yaparsın?”',
            options: [
                {
                    text: 'Sert çıkış yap, taviz verme',
                    isCorrect: false,
                },
                {
                    text: 'Sakin kal, zamanı bekle.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'new.mp4', 
            incorrectOutcomeVideo: 'new.mp4', 
            
        },

        // -----------------------------------------------------------------
        // --- YENİ EKLENEN EVENT 3: LOZAN (Planımıza Göre) ---
        // -----------------------------------------------------------------
        {
            id: 'inonu-3-lozan',
            introVideoFile: 'new.mp4', // Üretilecek video
            
            
            eventContext: ' Zorluk anında nasıl bir lider olurdun?',
            options: [
                {
                    text: 'Seçenek :Cesur, risk alarak öne çıkan lider',
                    isCorrect: false, // Lozan'da sabır ve kararlılık kazandı
                },
                {
                    text: 'Seçenek : Soğukkanlı, plan yaparak ilerleyen lider',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'final.mp4', // Üretilecek video
            incorrectOutcomeVideo: 'final.mp4', // Üretilecek video
             
        },

        // -----------------------------------------------------------------
        // --- YENİ EKLENEN EVENT 4: LİDERLİK (Planımıza Göre) ---
        // -----------------------------------------------------------------
      
    ],
    
    // Diğer karakterler için (kazimkarabekir, fevzicakmak)
    // eventleri buraya ekleyebilirsiniz.
    kazimkarabekir: [
        {
            id: 'karabekir-placeholder',
            finalVideo: 'final-karabekir.mp4', // Final video for Kazım Karabekir character
        }
    ],
    fevzicakmak: [
        {
            id: 'cakmak-placeholder',
            finalVideo: 'final-cakmak.mp4', // Final video for Fevzi Çakmak character
        }
    ],
};
