import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 'exp-1',
        role: 'Systems Software Intern',
        company: 'ENTION®',
        duration: 'Feb 2026 - Aug 2026',
        impact: [
            'Worked on operating system–level components with a focus on performance',
            'process management, and system behavior. Explored scheduling, memory handling, and low-level debugging',
            'in Linux-based environments while building tools and modules',
            'to better understand system internals and resource usage.'

        ]
    },
    {
        id: 'exp-2',
        role: 'Backend Web Developer Intern',
        company: 'ENTION®',
        duration: 'June 2025 - Aug 2025',
        impact: [
            'Backend Developer',
            'Developed and maintained RESTful APIs and backend services using Node.js and Spring Boot',
            'Implemented authentication, database interactions, and performance optimizations while ensuring',
            'secure and scalable system design across production-style projects.'

        ]
    },
    
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
