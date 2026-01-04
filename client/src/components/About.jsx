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

        tl.from('.about-photo-wrapper', {
            scale: 0.9,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)'
        }, '-=0.6');

    }, { scope: containerRef });

    return (
        <section id="about" className="section-about" ref={containerRef}>
            <div className="container about-container">
                <div className="about-profile">
                    <div className="about-photo-wrapper">
                        <img
                            src="/images/profile.jpg"
                            alt="Atharvix profile"
                            className="about-profile-img"
                        />
                    </div>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title mono text-cyan">_ABOUT</h2>
                        <p className="lead">
                            I build secure backend systems with a <span className="text-cyan">Linux-first</span> mindset and a focus on <span className="text-purple">performance</span> at scale.
                        </p>
                        <p className="mono" style={{ fontSize: '0.95rem', lineHeight: '1.8', opacity: 0.9 }}>
                            <span className="text-dim"># Core competencies:</span><br />
                            <span className="text-cyan">→</span> Designing robust APIs and authentication systems with Node.js & Spring<br />
                            <span className="text-cyan">→</span> Deep expertise in Linux server environments and system administration<br />
                            <span className="text-cyan">→</span> Security-aware development practices and threat modeling<br />
                            <span className="text-cyan">→</span> Building scalable architectures optimized for reliability and speed
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
