import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from('.about-text > *', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });

        tl.from('.profile-photo', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
        }, '-=0.6');

    }, { scope: containerRef });

    return (
        <section id="about" className="section-about" ref={containerRef}>
            <div className="container about-container">
                <div className="about-profile">
                    <div className="profile-photo">
                        {<img src=".../images/profile.jpg" alt="Profile" /> }
                        <span>[ PROFILE PHOTO ]</span>
                    </div>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title mono text-cyan">_ABOUT</h2>
                        <p className="lead">
                            I am a developer who bridges the gap between <span className="text-purple">design</span> and <span className="text-cyan">engineering</span>.
                        </p>
                        <p>
                            With a background in both visual arts and computer science, I craft digital products that look beautiful and perform perfectly. I specialize in React, WebGL, and accessible motion.
                        </p>
                        <p>
                            When not coding, I am exploring cyberpunk aesthetics and experimenting with generative art.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
