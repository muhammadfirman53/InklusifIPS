export const speakText = (text: string, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[*_#`]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Try to find Indonesian voice
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
