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
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%'
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="projects" className="section-projects" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-cyan">&lt;Projects /&gt;</h2>

                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            className="project-card glow-box"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="card-header">
                                <div className="dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <span className="card-title mono">{project.title}</span>
                            </div>
                            <div className="card-body">
                                <p className="card-desc">{project.description}</p>
                                <div className="card-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag mono">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content glow-box" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProject(null)}>
                            <X size={24} />
                        </button>
                        <h3 className="modal-title mono text-cyan">{selectedProject.title}</h3>
                        <p className="modal-desc">{selectedProject.description}</p>
                        <div className="modal-tags">
                            {selectedProject.tags.map(tag => (
                                <span key={tag} className="tag mono">#{tag}</span>
                            ))}
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
            )}
        </section>
    );
};

export default Projects;
