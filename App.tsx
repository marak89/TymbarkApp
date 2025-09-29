import React, { useState, useCallback } from 'react';
import { fetchTymbarkText } from './services/geminiService';
import BottleCap from './components/BottleCap';
import Header from './components/Header';

const Footer: React.FC = () => (
    <footer className="absolute bottom-4 text-center text-green-300 text-sm w-full">
        Stworzone z użyciem Gemini AI
    </footer>
);

const App: React.FC = () => {
  const [text, setText] = useState<string>('Kliknij, aby wylosować!');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleDrawText = useCallback(async () => {
    if (isBusy) return;
    setIsBusy(true);

    // If the cap is already showing text, flip it back to the logo side first.
    if (isFlipped) {
      setIsFlipped(false);
      // Wait for the flip-back animation to finish.
      await new Promise(res => setTimeout(res, 700));
    }

    // Now, we are ready to flip to the text side.
    setIsFlipped(true);
    setIsLoadingText(true);
    
    try {
      const newText = await fetchTymbarkText();
      setText(newText);
    } catch (e) {
      console.error("Error fetching text:", e);
      setText("Błąd losowania!");
    } finally {
      setIsLoadingText(false);
    }
    
    // Allow clicking again after the forward animation finishes.
    await new Promise(res => setTimeout(res, 700));
    setIsBusy(false);

  }, [isBusy, isFlipped]);

  return (
    <div className="min-h-screen bg-green-800 bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <Header />
      <main className="flex flex-col items-center justify-center gap-12 my-4">
        <BottleCap text={text} isFlipping={isFlipped} isLoading={isLoadingText} />
        <button
          onClick={handleDrawText}
          disabled={isBusy}
          className="px-8 py-4 bg-white text-green-700 font-bold text-xl rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isBusy ? 'Losowanie...' : 'Wylosuj tekst!'}
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default App;
