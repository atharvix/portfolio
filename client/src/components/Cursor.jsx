import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Check if hovering over interactive elements
            const target = e.target;
            const isInteractive = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button');

            const isInput = target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA';

            if (isInput) {
                cursor.classList.add('hidden');
                follower.classList.add('hidden');
            } else {
                cursor.classList.remove('hidden');
                follower.classList.remove('hidden');

                if (isInteractive) {
                    cursor.classList.add('hovering');
                    follower.classList.add('hovering');
                } else {
                    cursor.classList.remove('hovering');
                    follower.classList.remove('hovering');
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor-dot" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    );
};

export default Cursor;
