import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        Kapsel Tymbark AI
      </h1>
      <p className="text-green-200 mt-2 text-lg">Wylosuj swój tekst na dziś!</p>
    </header>
  );
};

export default Header;
