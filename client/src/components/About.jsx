import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        role: 'Senior Frontend Engineer',
        company: 'TechCorp',
        period: '2023 - Present',
        desc: 'Architecting next-gen user interfaces.'
    },
    {
        role: 'Creative Developer',
        company: 'Digital Agency',
        period: '2021 - 2023',
        desc: 'Building award-winning web experiences.'
    },
    {
        role: 'Full Stack Dev',
        company: 'StartUp Inc',
        period: '2019 - 2021',
        desc: 'Scaling microservices and UI libraries.'
    }
];

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

        tl.from('.exp-card', {
            x: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

    }, { scope: containerRef });

    return (
        <section id="about" className="section-about" ref={containerRef}>
            <div className="container about-container">
                <div className="about-text">
                    <h2 className="section-title mono text-cyan">&lt;About /&gt;</h2>
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

                <div className="experience-list">
                    <h3 className="exp-title mono">_EXPERIENCE</h3>
                    {experiences.map((exp, index) => (
                        <div key={index} className="exp-card glow-box">
                            <div className="exp-header">
                                <span className="exp-role text-cyan">{exp.role}</span>
                                <span className="exp-period mono text-dim">{exp.period}</span>
                            </div>
                            <h4 className="exp-company">{exp.company}</h4>
                            <p className="exp-desc text-dim">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
