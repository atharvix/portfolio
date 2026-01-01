import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 'exp-1',
        role: 'Frontend Engineer Intern',
        company: 'TechCorp Inc.',
        duration: 'Jun 2023 - Aug 2023',
        impact: [
            'Built responsive dashboard using React and TypeScript',
            'Improved page load time by 40% through code splitting',
            'Collaborated with design team on component library'
        ]
    },
    {
        id: 'exp-2',
        role: 'Freelance Web Developer',
        company: 'Digital Agency',
        duration: 'Jan 2022 - May 2023',
        impact: [
            'Delivered 8+ client websites with 100% satisfaction rate',
            'Specialized in GSAP animations and WebGL experiences',
            'Managed full project lifecycle from design to deployment'
        ]
    },
    {
        id: 'exp-3',
        role: 'Full Stack Developer Intern',
        company: 'StartUp Labs',
        duration: 'Summer 2022',
        impact: [
            'Developed RESTful APIs using Node.js and Express',
            'Implemented authentication system with JWT',
            'Wrote unit tests achieving 85% code coverage'
        ]
    }
];

const Experience = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // CRITICAL FIX: Set initial visibility to ensure all cards render
        gsap.set('.exp-terminal', { opacity: 1, y: 0 });
        gsap.set('.timeline-line', { height: 'auto' });
        gsap.set('.exp-node', { scale: 1, opacity: 1 });

        // Animate timeline line
        gsap.from('.timeline-line', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            },
            height: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        });

        // Animate each timeline node - targets ALL nodes
        gsap.from('.exp-node', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            },
            scale: 0,
            opacity: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });

        // Animate terminal cards - targets ALL cards with stagger
        gsap.from('.exp-terminal', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            },
            x: 100,
            opacity: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="experience" className="section-experience" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-purple">_EXPERIENCE</h2>

                <div className="experience-timeline">
                    <div className="timeline-line"></div>

                    {experiences.map((exp) => (
                        <div key={exp.id} className="exp-item">
                            <div className="exp-node"></div>

                            <div className="exp-terminal terminal-window">
                                <div className="terminal-header">
                                    <div className="terminal-dots">
                                        <span className="dot red"></span>
                                        <span className="dot yellow"></span>
                                        <span className="dot green"></span>
                                    </div>
                                    <span className="terminal-title mono text-dim">{exp.duration}</span>
                                </div>

                                <div className="terminal-body">
                                    <div className="log-line">
                                        <span className="prompt">{'>'}</span>
                                        <span className="log-key">role:</span>
                                        <span className="log-value text-cyan">{exp.role}</span>
                                    </div>
                                    <div className="log-line">
                                        <span className="prompt">{'>'}</span>
                                        <span className="log-key">company:</span>
                                        <span className="log-value">{exp.company}</span>
                                    </div>
                                    <div className="log-line">
                                        <span className="prompt">{'>'}</span>
                                        <span className="log-key">impact:</span>
                                    </div>
                                    {exp.impact.map((point, i) => (
                                        <div key={i} className="log-line indent">
                                            <span className="bullet">-</span>
                                            <span className="log-text text-dim">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
