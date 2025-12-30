import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, Server, Database, Layout, Smartphone, Box, Terminal, Cpu } from 'lucide-react';
import './Skills.css';

const allSkills = [
    { name: 'React', category: 'frontend', icon: Code },
    { name: 'Node.js', category: 'backend', icon: Server },
    { name: 'PostgreSQL', category: 'backend', icon: Database },
    { name: 'CSS/Sass', category: 'frontend', icon: Layout },
    { name: 'Svelte', category: 'frontend', icon: Box },
    { name: 'Mobile', category: 'frontend', icon: Smartphone },
    { name: 'DevOps', category: 'tools', icon: Terminal },
    { name: 'System Design', category: 'backend', icon: Cpu },
];

const Skills = () => {
    const [filter, setFilter] = useState('all');
    const containerRef = useRef(null);

    const filteredSkills = filter === 'all'
        ? allSkills
        : allSkills.filter(s => s.category === filter);

    useGSAP(() => {
        gsap.fromTo('.skill-item',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out' }
        );
    }, { scope: containerRef, dependencies: [filter] });

    return (
        <section className="section-skills" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-purple">&lt;Skills /&gt;</h2>

                <div className="skills-filter mono">
                    {['all', 'frontend', 'backend', 'tools'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            _{cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="skills-grid">
                    {filteredSkills.map((skill) => (
                        <div key={skill.name} className="skill-item glow-box">
                            <skill.icon className="skill-icon" size={32} />
                            <span className="skill-name mono">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
