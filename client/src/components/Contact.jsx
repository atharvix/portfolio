import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Send, Check, AlertCircle, Loader } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const containerRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    useGSAP(() => {
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="contact" className="section-contact" ref={containerRef}>
            <div className="container contact-container">
                <div className="contact-text">
                    <h2 className="section-title mono text-cyan">&lt;Contact /&gt;</h2>
                    <p className="contact-desc">
                        Ready to initiate a new sequence? Send a transmission across the void.
                    </p>
                    <div className="contact-coords mono text-dim">
                        <p>LAT: 34.0522° N</p>
                        <p>LNG: 118.2437° W</p>
                        <p>STATUS: ONLINE</p>
                    </div>
                </div>

                <form className="contact-form glow-box" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="mono" htmlFor="name">_NAME</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Identify yourself"
                        />
                    </div>
                    <div className="form-group">
                        <label className="mono" htmlFor="email">_EMAIL</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="secure@channel.com"
                        />
                    </div>
                    <div className="form-group">
                        <label className="mono" htmlFor="message">_MESSAGE</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="form-input"
                            rows="5"
                            placeholder="Enter payload..."
                        ></textarea>
                    </div>

                    <button type="submit" className={`submit-btn ${status}`} disabled={status === 'loading' || status === 'success'}>
                        {status === 'idle' && <>Send Transmission <Send size={18} /></>}
                        {status === 'loading' && <><Loader className="spin" size={18} /> Sending...</>}
                        {status === 'success' && <>Transmission Sent <Check size={18} /></>}
                        {status === 'error' && <>Error - Retry <AlertCircle size={18} /></>}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
