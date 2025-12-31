import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, Server, Database, Layout, Smartphone, Box, Terminal, Cpu } from 'lucide-react';
import './Skills.css';

const allSkills = [
    // Core
    { name: 'React', category: 'core', icon: Code },
    { name: 'TypeScript', category: 'core', icon: Code },
    { name: 'Node.js', category: 'core', icon: Server },
    { name: 'CSS/Sass', category: 'core', icon: Layout },

    // Working Knowledge
    { name: 'PostgreSQL', category: 'working', icon: Database },
    { name: 'Svelte', category: 'working', icon: Box },
    { name: 'Mobile Dev', category: 'working', icon: Smartphone },
    { name: 'System Design', category: 'working', icon: Cpu },

    // Tools
    { name: 'Git', category: 'tools', icon: Terminal },
    { name: 'Docker', category: 'tools', icon: Box },
    { name: 'Figma', category: 'tools', icon: Layout },
    { name: 'VS Code', category: 'tools', icon: Code },
];

const categoryLabels = {
    core: 'Core Skills',
    working: 'Working Knowledge',
    tools: 'Tools & Platforms'
};

const Skills = () => {
    const [filter, setFilter] = useState('all');
    const containerRef = useRef(null);

    const filteredSkills = filter === 'all'
        ? allSkills
        : allSkills.filter(s => s.category === filter);

    // Group skills by category for display
    const groupedSkills = filter === 'all'
        ? {
            core: allSkills.filter(s => s.category === 'core'),
            working: allSkills.filter(s => s.category === 'working'),
            tools: allSkills.filter(s => s.category === 'tools')
        }
        : null;

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
                    {['all', 'core', 'working', 'tools'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            _{cat === 'all' ? 'ALL' : categoryLabels[cat].toUpperCase()}
                        </button>
                    ))}
                </div>

                {filter === 'all' ? (
                    <div className="skills-categories">
                        {Object.entries(groupedSkills).map(([category, skills]) => (
                            <div key={category} className="skill-category">
                                <h3 className="category-title mono">{categoryLabels[category]}</h3>
                                <div className="skills-grid">
                                    {skills.map((skill) => (
                                        <div key={skill.name} className="skill-item">
                                            <skill.icon className="skill-icon" size={28} />
                                            <span className="skill-name mono">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="skills-grid">
                        {filteredSkills.map((skill) => (
                            <div key={skill.name} className="skill-item">
                                <skill.icon className="skill-icon" size={28} />
                                <span className="skill-name mono">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
