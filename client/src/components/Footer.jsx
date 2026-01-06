import { Github, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <a href="#hero" className="footer-logo-btn" aria-label="Back to top">
                    <img src="/vite.svg" alt="Atharvix logo" className="footer-logo" />
                </a>

                <div className="footer-links">
                    <a
                        href="https://github.com/atharvix"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://linkedin.com/in/atharvmehrotra27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>

                <div className="footer-copy mono text-dim">
                    &copy; {new Date().getFullYear()} atharvix. All systems nominal.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
