export const GAME_EVENTS = {
    inonu: [
        // --- EVENT 1 (Mevcut Olayın) ---
        {
            id: 'inonu-1-anadolu-gecis',
            finalVideo: 'final-inonu.mp4', // Final video for İsmet İnönü character
            introVideoFile: 'new.mp4', 
           
            eventTitle: 'Milli Mücadelenin Başlangıcı: Anadolu\'ya Geçiş Kararı',
            eventContext: '1  Ocak 1921. Eskişehir’in doğusunda sisli bir sabah. Yeni kurulmuş ordunun morali kırılmak üzere. Komutan olarak biliyorsun: Bu karar, sadece bugünü değil, ordunun geleceğini belirleyecek. Ne yapardın?',
            options: [
                {
                    text: 'Seçenek : ",Birlikleri geri çek, yeniden düzenle. “Kaybettiğin bir mevziyi geri alırsın, ama dağılan bir orduyu yeniden kuramazsın.” ',
                    isCorrect: false,
                },
                {
                    text: 'Seçenek :" Mevzide kal, diren, orduya güven ver. “Cesaret bulaşıcıdır; geri adım atmazsan asker de atmaz.”',
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
