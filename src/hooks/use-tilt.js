import { useRef, useEffect } from 'react';

/**
 * Custom hook to apply a smooth 3D tilt effect on mouse move.
 * @param {number} intensity - The rotation intensity (default 10).
 * @returns {React.RefObject} - The ref to be assigned to the element.
 */
const useTilt = (intensity = 10) => {
    const elRef = useRef(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            const rotateX = (y - 0.5) * intensity * -1;
            const rotateY = (x - 0.5) * intensity;

            el.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
        };

        const handleMouseLeave = () => {
            el.style.transform = `
                perspective(1000px) 
                rotateX(0deg) 
                rotateY(0deg) 
                scale3d(1, 1, 1)
            `;
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return elRef;
};

export default useTilt;
