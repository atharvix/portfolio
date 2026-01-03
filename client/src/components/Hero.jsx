import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-title', {
            duration: 0.8,
            y: 80,
            opacity: 0,
            stagger: 0.15,
            delay: 0.3
        })
            .from('.hero-role', {
                duration: 0.6,
                opacity: 0,
                x: -30,
            }, '-=0.4')
            .from('.code-editor', {
                duration: 0.8,
                opacity: 0,
                scale: 0.95,
                ease: 'back.out(1.2)'
            }, '-=0.4');

    }, { scope: containerRef });

    return (
        <section className="hero" ref={containerRef}>
            <div className="container hero-content">
                <div className="hero-text">
                    <h2 className="hero-greeting mono text-cyan">&gt; INITIALIZING SYSTEM...</h2>
                    <h1 className="hero-title">
                        <span className="block">CREATIVE</span>
                        <span className="block text-purple">TECHNOLOGIST</span>
                    </h1>
                    <p className="hero-role mono">
            // Building digital experiences that exist<br />
            // somewhere between reality and the void.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn-primary">View Projects</a>
                        <a href="#contact" className="btn-secondary">Contact Me</a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="code-editor glow-box">
                        <div className="editor-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                            <span className="editor-title">profile.js</span>
                        </div>
                        <div className="editor-content mono">
                            <div className="line"><span className="keyword">const</span> <span className="var">coder</span> = <span className="brace">{'{'}</span></div>
                            <div className="line indent">  name: <span className="string">'Atharv Mehrotra'</span>,</div>
                            <div className="line indent">  role: <span className="string">'Backend Developer'</span>,</div>
                            <div className="line indent">  skills: [<span className="string">'Node.js'</span>, <span className="string">'React'</span>, <span className="string">'Spring Boot'</span>],</div>
                            <div className="line indent">  status: <span className="string">'Ready to build'</span></div>
                            <div className="line"><span className="brace">{'}'}</span>;</div>
                            <div className="line typing-cursor">|</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
