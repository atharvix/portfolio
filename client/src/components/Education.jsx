import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Education.css';

const educationData = [
    {
        year: '2024 - 2028',
        degree: 'Bachelor of Technology in Computer Science & Artificial Intelligence',
        school: 'JK Lakshmipat University',
        desc: 'Specialized in Full Stack Web Development with AI and Human-Computer Interaction.'
    },
    {
        year: '2009 - 2024',
        degree: 'Highschool & Intermediate Education',
        school: 'City Montessori School',
        desc: 'Highschool & Intermediate Education with a focus on Science and Mathematics.'
    }
];

const Education = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            }
        });

        tl.from('.timeline-line', {
            height: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        })
            .from('.edu-node', {
                scale: 0,
                opacity: 0,
                stagger: 0.5,
                duration: 0.5,
                ease: 'back.out'
            }, '-=1');

    }, { scope: containerRef });

    return (
        <section className="section-education" ref={containerRef}>
            <div className="container">
                <h2 className="section-title mono text-center text-green">_EDUCATION</h2>

                <div className="timeline">
                    <div className="timeline-line"></div>

                    {educationData.map((edu, index) => (
                        <div key={index} className="edu-item">
                            <div className="edu-node glow-box"></div>
                            <div className="edu-content">
                                <span className="edu-year mono text-green">{edu.year}</span>
                                <h3 className="edu-degree">{edu.degree}</h3>
                                <h4 className="edu-school text-dim">{edu.school}</h4>
                                <p className="edu-desc">{edu.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
