import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = 'text-green-300' }) => (
    <footer className={`text-center text-sm w-full ${className}`}>
        Stworzone z użyciem Gemini AI
    </footer>
);

export default Footer;
