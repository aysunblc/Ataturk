import ScoreAnalysisScreen from './ScoreAnalysisScreen';

const AnalysisScreen = ({ results, onRestart, userAnswers = [] }) => {
  console.log('📊 AnalysisScreen - userAnswers:', userAnswers);
  console.log('📊 AnalysisScreen - results:', results);
  
  // Sadece quiz sorularını değerlendirmeye dahil et
  const quizAnswers = userAnswers.filter(answer => answer.questionType === 'quiz');
  const characterAnswers = userAnswers.filter(answer => answer.questionType === 'character');
  
  // Quiz soruları için skor hesapla
  const total = quizAnswers.length;
  const correct = quizAnswers.filter(answer => answer.isCorrect).length;
  const incorrect = total - correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const finalScore = {
    correct,
    incorrect,
    total,
    percentage
  };

  /**
   * GenAI ile karakter analizi ve quiz sonuçlarına göre feedback oluştur
   * Bu fonksiyon gerçek bir AI API'si ile entegre edilebilir
   */
  const getFeedbackMessage = (percentage) => {
    // Karakter analizi verilerini topla
    const characterTraits = characterAnswers.map(answer => ({
      question: answer.eventTitle,
      trait: answer.characterTrait,
      choice: answer.selectedText
    }));
    
    // Quiz performansına göre temel mesaj
    let performanceMessage = '';
    if (percentage === 100) {
      performanceMessage = "Mükemmel! Tüm stratejik kararları doğru verdiniz.";
    } else if (percentage >= 75) {
      performanceMessage = "Harika! Çoğu kritik kararı doğru verdiniz.";
    } else if (percentage >= 50) {
      performanceMessage = "İyi! Bazı kararlarda tereddüt ettiniz.";
    } else {
      performanceMessage = "Tarih zor bir sınavdır. Tekrar deneyin!";
    }
    
    // Karakter analizi mesajı
    let characterMessage = '';
    if (characterTraits.length > 0) {
      const hasBold = characterTraits.some(t => t.trait === 'bold');
      const hasStrategic = characterTraits.some(t => t.trait === 'strategic');
      
      if (hasBold && !hasStrategic) {
        characterMessage = " Liderlik tarzınız cesur ve risk almayı seven bir yapıda. Hızlı kararlar alıyorsunuz.";
      } else if (hasStrategic && !hasBold) {
        characterMessage = " Liderlik tarzınız soğukkanlı ve stratejik. Planlı hareket etmeyi tercih ediyorsunuz.";
      } else {
        characterMessage = " Liderlik tarzınız dengeli - hem cesur hem de stratejik düşünebiliyorsunuz.";
      }
    }
    
    // TODO: Gerçek GenAI entegrasyonu için bu kısım güncellenebilir
    // Örnek: OpenAI API, Google Gemini, vb.
    // const aiResponse = await callAIAPI({
    //   quizPerformance: percentage,
    //   characterTraits: characterTraits,
    //   correctAnswers: correct,
    //   totalQuestions: total
    // });
    
    return performanceMessage + characterMessage;
  };

  // Ana menüye dön fonksiyonu
  const handleGameEnd = () => {
    console.log('🏠 Ana menüye dönülüyor');
    onRestart();
  };

  // Yeniden başla fonksiyonu
  const handleRestart = () => {
    console.log('🔄 Oyun yeniden başlatılıyor');
    onRestart();
  };

  return (
    <ScoreAnalysisScreen
      finalScore={finalScore}
      userAnswers={quizAnswers}
      onGameEnd={handleGameEnd}
      onRestart={handleRestart}
      getFeedbackMessage={getFeedbackMessage}
    />
  );
};

export default AnalysisScreen;
