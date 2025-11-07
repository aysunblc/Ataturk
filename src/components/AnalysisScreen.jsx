import React from "react";
import ScoreAnalysisScreen from './ScoreAnalysisScreen';

const AnalysisScreen = ({ results, onRestart, userAnswers = [] }) => {
  console.log('📊 AnalysisScreen - userAnswers:', userAnswers);
  console.log('📊 AnalysisScreen - results:', results);
  
  // userAnswers'dan skor hesapla
  const total = userAnswers.length;
  const correct = userAnswers.filter(answer => answer.isCorrect).length;
  const incorrect = total - correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const finalScore = {
    correct,
    incorrect,
    total,
    percentage
  };

  /**
   * Yüzdelik skora göre özelleştirilmiş geri bildirim mesajı döndürür
   */
  const getFeedbackMessage = (percentage) => {
    if (percentage === 100) {
      return "Mükemmel! Tüm kararları doğru verdiniz!";
    } else if (percentage >= 75) {
      return "Harika! Çoğu kritik kararı doğru verdiniz.";
    } else if (percentage >= 50) {
      return "İyi! Bazı kararlarda tereddüt ettiniz.";
    } else {
      return "Tarih zor bir sınavdır. Tekrar deneyin!";
    }
  };

  // Ana menüye dön fonksiyonu (WELCOME state'ine geçiş)
  const handleGameEnd = () => {
    console.log('🏠 Ana menüye dönülüyor');
    onRestart(); // Bu aslında App.jsx'teki handleRestart fonksiyonu
  };

  // Yeniden başla fonksiyonu (SELECTION state'ine geçiş)
  const handleRestart = () => {
    console.log('🔄 Oyun yeniden başlatılıyor');
    // Burada karakter seçimine geri dönmek için App.jsx'te yeni bir fonksiyon gerekebilir
    // Şimdilik ana menüye dönelim
    onRestart();
  };

  return (
    <ScoreAnalysisScreen
      finalScore={finalScore}
      userAnswers={userAnswers}
      onGameEnd={handleGameEnd}
      onRestart={handleRestart}
      getFeedbackMessage={getFeedbackMessage}
    />
  );
};

export default AnalysisScreen;