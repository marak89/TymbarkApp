import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchTymbarkText } from './services/geminiService';
import BottleCap from './components/BottleCap';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [text, setText] = useState<string>('Kliknij, aby wylosować!');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [theme, setTheme] = useState({ color: 'green', mode: 'light' });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('tymbark-ai-theme');
      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error("Could not load theme from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tymbark-ai-theme', JSON.stringify(theme));
    } catch (error) {
      console.error("Could not save theme to localStorage", error);
    }
  }, [theme]);
  
  const themeConfig = useMemo(() => {
    if (theme.mode === 'dark') {
        return {
            bg: 'bg-gray-900 from-black to-gray-800',
            headerSubtitle: 'text-gray-300',
            footer: 'text-gray-400',
            buttonText: 'text-gray-900',
            buttonRing: 'focus:ring-gray-400',
        };
    }
    const colorMap: { [key: string]: any } = {
        green: { bg: 'bg-green-800 from-green-700 to-green-900', headerSubtitle: 'text-green-200', footer: 'text-green-300', buttonText: 'text-green-700', buttonRing: 'focus:ring-green-300' },
        red: { bg: 'bg-red-800 from-red-700 to-red-900', headerSubtitle: 'text-red-200', footer: 'text-red-300', buttonText: 'text-red-700', buttonRing: 'focus:ring-red-300' },
        yellow: { bg: 'bg-yellow-800 from-yellow-700 to-yellow-900', headerSubtitle: 'text-yellow-200', footer: 'text-yellow-300', buttonText: 'text-yellow-700', buttonRing: 'focus:ring-yellow-300' },
        blue: { bg: 'bg-blue-800 from-blue-700 to-blue-900', headerSubtitle: 'text-blue-200', footer: 'text-blue-300', buttonText: 'text-blue-700', buttonRing: 'focus:ring-blue-300' },
        indigo: { bg: 'bg-indigo-800 from-indigo-700 to-indigo-900', headerSubtitle: 'text-indigo-200', footer: 'text-indigo-300', buttonText: 'text-indigo-700', buttonRing: 'focus:ring-indigo-300' },
        purple: { bg: 'bg-purple-800 from-purple-700 to-purple-900', headerSubtitle: 'text-purple-200', footer: 'text-purple-300', buttonText: 'text-purple-700', buttonRing: 'focus:ring-purple-300' },
        pink: { bg: 'bg-pink-800 from-pink-700 to-pink-900', headerSubtitle: 'text-pink-200', footer: 'text-pink-300', buttonText: 'text-pink-700', buttonRing: 'focus:ring-pink-300' },
    };
    return colorMap[theme.color] || colorMap.green;
  }, [theme]);


  const handleDrawText = useCallback(async () => {
    if (isBusy) return;
    setIsBusy(true);

    if (isFlipped) {
      setIsFlipped(false);
      await new Promise(res => setTimeout(res, 700));
    }

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
    
    await new Promise(res => setTimeout(res, 700));
    setIsBusy(false);

  }, [isBusy, isFlipped]);

  return (
    <div className={`min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4 font-sans overflow-hidden transition-colors duration-500 ${themeConfig.bg}`}>
      <Header subtitleClassName={themeConfig.headerSubtitle} />
      <main className="flex flex-col items-center justify-center gap-12 my-4">
        <BottleCap text={text} isFlipping={isFlipped} isLoading={isLoadingText} />
        <button
          onClick={handleDrawText}
          disabled={isBusy}
          className={`px-8 py-4 bg-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none ${themeConfig.buttonText} ${themeConfig.buttonRing}`}
        >
          {isBusy ? 'Losowanie...' : 'Wylosuj tekst!'}
        </button>
      </main>
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4 px-4">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        <Footer className={themeConfig.footer} />
      </div>
    </div>
  );
};

export default App;