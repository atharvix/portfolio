import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, Server, Database, Layout, Smartphone, Box, Terminal, Cpu, Zap, Globe } from 'lucide-react';
import './Skills.css';

const allSkills = [
    { name: 'React', icon: Code },
    { name: 'TypeScript', icon: Code },
    { name: 'Node.js', icon: Server },
    { name: 'PostgreSQL', icon: Database },
    { name: 'CSS/Sass', icon: Layout },
    { name: 'Svelte', icon: Box },
    { name: 'Mobile Dev', icon: Smartphone },
    { name: 'System Design', icon: Cpu },
    { name: 'Git', icon: Terminal },
    { name: 'Docker', icon: Box },
    { name: 'WebGL', icon: Zap },
    { name: 'GraphQL', icon: Globe },
];

const Skills = () => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);

    useGSAP(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Duplicate skills for seamless loop
        const skillItems = scroller.querySelectorAll('.skill-item');
        const scrollerWidth = scroller.scrollWidth / 2;

        // Infinite horizontal scroll animation
        const tl = gsap.timeline({ repeat: -1 });

        tl.to(scroller, {
            x: -scrollerWidth,
            duration: 30,
            ease: 'none'
        });

        // Pause on hover
        scroller.addEventListener('mouseenter', () => tl.pause());
        scroller.addEventListener('mouseleave', () => tl.play());

        return () => {
            scroller.removeEventListener('mouseenter', () => tl.pause());
            scroller.removeEventListener('mouseleave', () => tl.play());
        };
    }, { scope: containerRef });

    return (
        <section className="section-skills" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-purple">_SKILLS</h2>

                <div className="skills-marquee">
                    <div className="skills-scroller" ref={scrollerRef}>
                        {/* Render skills twice for seamless loop */}
                        {[...allSkills, ...allSkills].map((skill, index) => (
                            <div key={index} className="skill-item">
                                <skill.icon className="skill-icon" size={32} />
                                <span className="skill-name mono">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
