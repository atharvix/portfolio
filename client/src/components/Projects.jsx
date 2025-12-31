import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, ExternalLink, Github } from 'lucide-react';
import projectsData from '../data/projects.json';
import './Projects.css';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        // Fix: Ensure cards are visible even if animation hasn't triggered
        gsap.set('.project-card', { opacity: 1, y: 0 });

        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="projects" className="section-projects" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-cyan">_PROJECTS</h2>

                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            className="project-card terminal-window"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <span className="terminal-title mono">{project.title}</span>
                            </div>
                            <div className="terminal-body">
                                <div className="code-line">
                                    <span className="line-number">01</span>
                                    <span className="keyword">const</span> <span className="var">project</span> = <span className="brace">{'{'}</span>
                                </div>
                                <div className="code-line indent">
                                    <span className="line-number">02</span>
                                    <span className="key">description:</span> <span className="string">"{project.description.substring(0, 60)}..."</span>
                                </div>
                                <div className="code-line indent">
                                    <span className="line-number">03</span>
                                    <span className="key">stack:</span> <span className="array">[{project.tags.map(t => `"${t}"`).join(', ')}]</span>
                                </div>
                                <div className="code-line indent">
                                    <span className="line-number">04</span>
                                    <span className="key">impact:</span> <span className="string">"{project.impact}"</span>
                                </div>
                                <div className="code-line">
                                    <span className="line-number">05</span>
                                    <span className="brace">{'}'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content terminal-window" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProject(null)}>
                            <X size={24} />
                        </button>
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <span className="terminal-title mono">{selectedProject.title}</span>
                        </div>
                        <div className="modal-body">
                            <p className="modal-desc">{selectedProject.description}</p>
                            <div className="modal-tags">
                                {selectedProject.tags.map(tag => (
                                    <span key={tag} className="tag mono">#{tag}</span>
                                ))}
                            </div>
                            <div className="impact-line">
                                <span className="impact-label mono">Impact:</span>
                                <span className="impact-value text-cyan">{selectedProject.impact}</span>
                            </div>
                            <div className="modal-actions">
                                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="btn-modal">
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-modal secondary">
                                    <Github size={18} /> Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
