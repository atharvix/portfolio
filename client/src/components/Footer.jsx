import { Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo mono text-cyan">&lt;Antigravity /&gt;</div>

                <div className="footer-links">
                    <a href="#" className="footer-link"><Github size={20} /></a>
                    <a href="#" className="footer-link"><Twitter size={20} /></a>
                    <a href="#" className="footer-link"><Linkedin size={20} /></a>
                </div>

                <div className="footer-copy mono text-dim">
                    &copy; {new Date().getFullYear()} Mehro. All systems nominal.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
