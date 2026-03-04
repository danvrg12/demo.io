import React, { useState, useEffect } from 'react';
import bgImg from './assets/bg.png';

const App = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger fade-in and scale animation after component mounts
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            // Calculate mouse position relative to center of screen
            // Values will range from -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const styles = {
        container: {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#000',
        },
        background: {
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            width: '110%',
            height: '110%',
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // The background moves slightly opposite to the mouse direction
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: 'transform 0.1s ease-out',
            zIndex: 1,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 2,
        },
        textContainer: {
            zIndex: 3,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded
                ? `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg) scale(1)`
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.8)',
            transition: isLoaded ? 'transform 0.1s ease-out' : 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            textAlign: 'center',
        },
        heading: {
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)', // Responsive font size
            fontWeight: '700',
            letterSpacing: '0.1em',
            margin: 0,
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            userSelect: 'none',
        },
        subtext: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: '300',
            letterSpacing: '0.2em',
            marginTop: '1rem',
            textTransform: 'uppercase',
            userSelect: 'none',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.background} />
            <div style={styles.overlay} />

            <div style={styles.textContainer}>
                <h1 style={styles.heading}>Coming Soon</h1>
                <p style={styles.subtext}>Something awesome is in the works</p>
            </div>

            {/* Injecting basic global reset to ensure no scrollbars */}
            <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default App;
