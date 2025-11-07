export const GAME_EVENTS = {
    inonu: [
        // --- EVENT 1 (Mevcut Olayın) ---
        {
            id: 'inonu-1-anadolu-gecis',
            finalVideo: 'final-inonu.mp4', // Final video for İsmet İnönü character
            introVideoFile: 'new.mp4', 
            audioFile: 'background_music_1.mp3',
            eventTitle: 'Milli Mücadelenin Başlangıcı: Anadolu\'ya Geçiş Kararı',
            eventContext: 'İstanbul işgal altında. Mustafa Kemal Paşa sizi Anadolu\'ya çağırıyor. Ne yapacaksınız?',
            options: [
                {
                    text: 'Seçenek 1: İstanbul\'da Kalıp Diploması Yürütmek. Padişah\'ın yanında kalıp durumu içeriden çözmeyi denemek.',
                    isCorrect: false,
                },
                {
                    text: 'Seçenek 2: Anadolu\'ya Geçerek Direnişi Örgütlemek. Tüm rütbeleri bırakıp Milli Mücadele\'ye katılmak.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'deneme.mp4', 
            incorrectOutcomeVideo: 'new.mp4', 
            correctFeedback: 'Anadolu\'ya geçerek Milli Mücadele\'nin en önemli komutanlarından biri oldunuz ve tarihin akışını değiştirdiniz.',
            incorrectFeedback: 'İstanbul\'da kalmak, işgal kuvvetlerinin gözetimi altında pasif kalmanıza neden olurdu. Mücadele Anadolu\'da başlıyor.'
        },
        
        // --- EVENT 2 (Mevcut Olayın) ---
        {
            id: 'inonu-2-birinci-inonu',
            introVideoFile: 'olsun.mp4', 
            audioFile: 'background_music_2.mp3', 
            eventTitle: 'I. İnönü Muharebesi: Savunma mı, Geri Çekilme mi?',
            eventContext: 'Batı Cephesinde, sizden çok daha güçlü bir Yunan ordusu taarruza geçti. Emir komuta sizde.',
            options: [
                {
                    text: 'Seçenek 1: Geri Çekilme ve Eskişehir Hattını Koruma. Kayıp vermeden orduyu daha güvenli bir hatta çekmek.',
                    isCorrect: false,
                },
                {
                    text: 'Seçenek 2: Cephede Kalarak Hattı Ne Pahasına Olursa Olsun Savunmak. Bu, düzenli ordunun ilk sınavı, moral için kritik.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'new.mp4', 
            incorrectOutcomeVideo: 'new.mp4', 
            correctFeedback: 'Bu kararlı savunma, düzenli ordunun ilk zaferi oldu ve hem meclisin hem de halkın moralini zirveye taşıdı.',
            incorrectFeedback: 'Geri çekilmek, henüz yeni kurulan düzenli orduya olan güveni sarsar ve düşmanın Ankara\'ya ilerleyişini hızlandırırdı.'
        },

        // -----------------------------------------------------------------
        // --- YENİ EKLENEN EVENT 3: LOZAN (Planımıza Göre) ---
        // -----------------------------------------------------------------
        {
            id: 'inonu-3-lozan',
            introVideoFile: 'lnew.mp4', // Üretilecek video
            audioFile: 'diplomacy_theme.mp3', 
            eventTitle: 'Lozan Antlaşması: Diplomasi Savaşı',
            eventContext: 'Müzakereler tıkandı. İtilaf devletleri kapitülasyonlar konusunda taviz vermiyor. Nasıl bir strateji izlemelisin?',
            options: [
                {
                    text: 'Seçenek 1: Sert Bir Çıkış Yapmak. Gerekirse masayı terk edip savaşı göze almak.',
                    isCorrect: false, // Lozan'da sabır ve kararlılık kazandı
                },
                {
                    text: 'Seçenek 2: Sabırla Direnmek. Temel haklardan (kapitülasyonlar, sınırlar) asla taviz vermeden müzakereye devam etmek.',
                    isCorrect: true,
                },
            ],
            correctOutcomeVideo: 'new.mp4', // Üretilecek video
            incorrectOutcomeVideo: 'new.mp4', // Üretilecek video
            correctFeedback: 'Sabır ve kararlılık, Türk diplomasisinin en büyük zaferlerinden birini getirdi. Lozan, bağımsızlığın tapusudur.',
            incorrectFeedback: 'Masayı terk etmek büyük bir risk olurdu. Savaşın yorduğu bir ülke için diplomasiyi sonuna kadar zorlamak en doğru stratejiydi.'
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
