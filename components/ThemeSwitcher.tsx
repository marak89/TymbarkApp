import React from 'react';

interface Theme {
  color: string;
  mode: string;
}

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const colors = ['green', 'red', 'yellow', 'blue', 'indigo', 'purple', 'pink'];

const colorClasses: { [key: string]: string } = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {

  const handleColorChange = (color: string) => {
    setTheme(prevTheme => ({ ...prevTheme, color }));
  };

  const toggleDarkMode = () => {
    setTheme(prevTheme => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light'
    }));
  };

  const isDarkMode = theme.mode === 'dark';

  return (
    <div className="flex items-center gap-4 p-2 bg-black bg-opacity-20 rounded-full">
      <div className={`flex items-center gap-2 transition-opacity ${isDarkMode ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {colors.map((color) => (
          <button
            key={color}
            disabled={isDarkMode}
            aria-label={`Zmień kolor na ${color}`}
            onClick={() => handleColorChange(color)}
            className={`w-6 h-6 rounded-full ${colorClasses[color]} transition-transform hover:scale-110 ${theme.color === color && !isDarkMode ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`}
          />
        ))}
      </div>
      <div className="w-px h-6 bg-white opacity-30"></div>
      <button 
        onClick={toggleDarkMode} 
        aria-label={isDarkMode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
        className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
      >
        {isDarkMode ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-3.536a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3.05 4.536a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM16.95 15.464a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4.536 16.95a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707z" clipRule="evenodd" />
            </svg>
        ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
