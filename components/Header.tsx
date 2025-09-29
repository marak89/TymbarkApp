import React from 'react';

interface HeaderProps {
  subtitleClassName?: string;
}

const Header: React.FC<HeaderProps> = ({ subtitleClassName = 'text-green-200' }) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        Kapsel Tymbark AI
      </h1>
      <p className={`mt-2 text-lg ${subtitleClassName}`}>Wylosuj swój tekst na dziś!</p>
    </header>
  );
};

export default Header;