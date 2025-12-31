import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        company: 'TechCorp Inc.',
        role: 'Frontend Engineer Intern',
        duration: 'Jun 2023 - Aug 2023',
        points: [
            'Built responsive dashboard using React and TypeScript',
            'Improved page load time by 40% through code splitting',
            'Collaborated with design team on component library'
        ]
    },
    {
        company: 'Digital Agency',
        role: 'Freelance Web Developer',
        duration: 'Jan 2022 - May 2023',
        points: [
            'Delivered 8+ client websites with 100% satisfaction rate',
            'Specialized in GSAP animations and WebGL experiences',
            'Managed full project lifecycle from design to deployment'
        ]
    },
    {
        company: 'StartUp Labs',
        role: 'Full Stack Developer Intern',
        duration: 'Summer 2022',
        points: [
            'Developed RESTful APIs using Node.js and Express',
            'Implemented authentication system with JWT',
            'Wrote unit tests achieving 85% code coverage'
        ]
    }
];

const Experience = () => {
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

        tl.from('.experience-card', {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power3.out'
        });

    }, { scope: containerRef });

    return (
        <section id="experience" className="section-experience" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-purple">&lt;Experience /&gt;</h2>

                <div className="experience-grid">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-card">
                            <div className="exp-card-header">
                                <h3 className="exp-card-company">{exp.company}</h3>
                                <span className="exp-card-duration mono text-dim">{exp.duration}</span>
                            </div>
                            <h4 className="exp-card-role text-cyan">{exp.role}</h4>
                            <ul className="exp-card-points">
                                {exp.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
