import { useRef, useEffect } from 'react';

/**
 * Custom hook to create a magnetic attraction effect on a element.
 * @param {number} strength - The strength of the magnetic pull (default 0.3)
 */
export const useMagnetic = (strength = 0.3) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            
            // Apply magnetic pull
            element.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
        };

        const handleMouseLeave = () => {
            // Reset position
            element.style.transform = `translate(0px, 0px)`;
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};

export default useMagnetic;
