import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <a href="#hero" className="logo-hero-btn" aria-label="Go to hero section">
                <img src="/vite.svg" alt="Atharvix logo" className="site-logo" />
            </a>
            <nav>
                <ul className="nav-links mono">
                    <li><a href="#about">_ABOUT</a></li>
                    <li><a href="#experience">_EXPERIENCE</a></li>
                    <li><a href="#projects">_PROJECTS</a></li>
                    <li><a href="#contact">_CONTACT</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
