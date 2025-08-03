import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import logo from "../assets/avatar.png";

const Hero = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const logoRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup with dramatic lighting
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0a0a0a, 1, 100);
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        mountRef.current.appendChild(renderer.domElement);
        sceneRef.current = { scene, camera, renderer };

        // Dramatic lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        // Main spotlight
        const mainLight = new THREE.SpotLight(0x00ff88, 2, 100, Math.PI / 6, 0.5);
        mainLight.position.set(0, 20, 10);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        scene.add(mainLight);

        // Accent lights
        const accentLight1 = new THREE.PointLight(0xff6b35, 1.5, 50);
        accentLight1.position.set(-15, 5, 5);
        scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0x4dabf7, 1.5, 50);
        accentLight2.position.set(15, 5, 5);
        scene.add(accentLight2);

        // MASSIVE 3D LOGO - Complex geometric structure
        const createMassive3DLogo = () => {
            const logoGroup = new THREE.Group();

            // Central core - large torus with metallic material
            const coreGeometry = new THREE.TorusGeometry(4, 1.5, 16, 100);
            const coreMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x00ff88,
                metalness: 0.9,
                roughness: 0.1,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                transparent: true,
                opacity: 0.9
            });
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            logoGroup.add(core);

            // Orbiting rings
            for (let i = 0; i < 3; i++) {
                const ringGeometry = new THREE.RingGeometry(6 + i * 2, 6.5 + i * 2, 32);
                const ringMaterial = new THREE.MeshPhysicalMaterial({
                    color: i === 0 ? 0xff6b35 : i === 1 ? 0x4dabf7 : 0x9775fa,
                    metalness: 0.8,
                    roughness: 0.2,
                    transparent: true,
                    opacity: 0.7,
                    side: THREE.DoubleSide
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2;
                ring.rotation.z = (i * Math.PI) / 3;
                logoGroup.add(ring);
            }

            // Floating geometric elements
            const geometries = [
                new THREE.OctahedronGeometry(0.8),
                new THREE.IcosahedronGeometry(0.6),
                new THREE.TetrahedronGeometry(1.0)
            ];

            for (let i = 0; i < 12; i++) {
                const geom = geometries[i % geometries.length];
                const material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color().setHSL((i * 0.08) % 1, 0.8, 0.6),
                    metalness: 0.7,
                    roughness: 0.3,
                    transparent: true,
                    opacity: 0.8
                });
                
                const mesh = new THREE.Mesh(geom, material);
                const radius = 8 + Math.random() * 4;
                const angle = (i / 12) * Math.PI * 2;
                
                mesh.position.set(
                    Math.cos(angle) * radius,
                    (Math.random() - 0.5) * 6,
                    Math.sin(angle) * radius
                );
                
                logoGroup.add(mesh);
            }

            // Add text geometry for "AC" initials
            // Since we can't load external fonts, create geometric text representation
            const createTextGeometry = (char, x) => {
                const textGroup = new THREE.Group();
                
                // Create "A" or "C" using basic geometries
                if (char === 'A') {
                    // Create A shape with cylinders
                    const leftBar = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.1, 0.1, 3),
                        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
                    );
                    leftBar.position.set(-0.5, 0, 0);
                    leftBar.rotation.z = Math.PI / 6;
                    
                    const rightBar = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.1, 0.1, 3),
                        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
                    );
                    rightBar.position.set(0.5, 0, 0);
                    rightBar.rotation.z = -Math.PI / 6;
                    
                    const crossBar = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.08, 0.08, 1),
                        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
                    );
                    crossBar.position.set(0, 0.2, 0);
                    crossBar.rotation.z = Math.PI / 2;
                    
                    textGroup.add(leftBar, rightBar, crossBar);
                } else {
                    // Create C shape with torus
                    const cShape = new THREE.Mesh(
                        new THREE.TorusGeometry(1, 0.15, 8, 16, Math.PI * 1.5),
                        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
                    );
                    cShape.rotation.z = -Math.PI / 2;
                    textGroup.add(cShape);
                }
                
                textGroup.position.x = x;
                textGroup.scale.setScalar(0.8);
                return textGroup;
            };

            const letterA = createTextGeometry('A', -2);
            const letterC = createTextGeometry('C', 2);
            logoGroup.add(letterA, letterC);

            logoGroup.position.set(0, 0, -20);
            logoGroup.scale.setScalar(2);
            
            return logoGroup;
        };

        const logo3D = createMassive3DLogo();
        scene.add(logo3D);
        logoRef.current = logo3D;

        // Particle system - Professional and subtle
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            velocities[i * 3] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            
            // Professional color palette
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                colors[i * 3] = 0.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.53; // Green
            } else if (colorChoice < 0.7) {
                colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.42; colors[i * 3 + 2] = 0.21; // Orange
            } else {
                colors[i * 3] = 0.3; colors[i * 3 + 1] = 0.67; colors[i * 3 + 2] = 0.97; // Blue
            }
        }
        
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        camera.position.set(0, 5, 15);
        camera.lookAt(0, 0, 0);

        // Mouse interaction
        const handleMouseMove = (event) => {
            mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;
            
            // Animate massive 3D logo with complex rotations
            if (logoRef.current) {
                logoRef.current.rotation.y += 0.005;
                logoRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
                logoRef.current.position.y = Math.sin(time * 0.5) * 2;
                
                // Animate individual elements
                logoRef.current.children.forEach((child, index) => {
                    if (index > 3) { // Floating geometric elements
                        child.rotation.x += 0.01;
                        child.rotation.y += 0.015;
                        child.position.y += Math.sin(time * 2 + index) * 0.02;
                    } else if (index > 0 && index <= 3) { // Rings
                        child.rotation.z += 0.01 * (index + 1);
                    }
                });
            }

            // Animate particles
            const positionAttribute = particles.geometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];
                
                // Boundary wrapping
                if (Math.abs(positions[i * 3]) > 50) positions[i * 3] *= -0.9;
                if (Math.abs(positions[i * 3 + 1]) > 50) positions[i * 3 + 1] *= -0.9;
                if (Math.abs(positions[i * 3 + 2]) > 50) positions[i * 3 + 2] *= -0.9;
            }
            positionAttribute.needsUpdate = true;

            // Animate lights
            accentLight1.position.x = Math.sin(time) * 20;
            accentLight1.position.z = Math.cos(time) * 20;
            accentLight2.position.x = Math.cos(time * 1.2) * 20;
            accentLight2.position.z = Math.sin(time * 1.2) * 20;

            // Smooth camera movement
            camera.position.x += (mousePos.current.x * 3 - camera.position.x) * 0.05;
            camera.position.y += (-mousePos.current.y * 3 + 5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, -10);

            renderer.render(scene, camera);
        };

        animate();
        
        // Handle resize
        const handleResize = () => {
            if (!sceneRef.current) return;
            const { camera, renderer } = sceneRef.current;
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        
        setTimeout(() => setIsLoaded(true), 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                duration: 1.5, 
                staggerChildren: 0.4,
                delayChildren: 0.8
            } 
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.3, y: 100 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                duration: 1.0, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 80
            } 
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 60, rotateX: 90 },
        visible: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { 
                duration: 1.0, 
                ease: [0.25, 0.46, 0.45, 0.94]
            } 
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        hover: { 
            scale: 1.05, 
            y: -5,
            boxShadow: "0px 20px 40px rgba(0, 255, 136, 0.3)",
            transition: { duration: 0.3, ease: "easeOut" } 
        },
        tap: { scale: 0.95, y: 0 },
    };

    return (
        <div className="pb-20 relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
            {/* Three.js Background */}
            <div ref={mountRef} className="absolute inset-0 z-0" />
            
            {/* Professional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-5" />
            
            {/* Content Overlay */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="relative z-10 text-white pt-20 flex flex-col items-center justify-center w-full h-full px-6"
            >
                {/* Avatar with professional styling */}
                <motion.div
                    variants={imageVariants}
                    className="relative mb-8"
                >
                    <motion.div
                        className="relative"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.4, ease: "easeOut" }
                        }}
                    >
                        <img
                            src={logo}
                            alt="Austin-Chris"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl object-cover border-4 border-gray-600"
                        />
                        
                        {/* Professional glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "linear-gradient(45deg, rgba(0,255,136,0.3), rgba(255,107,53,0.3), rgba(77,171,247,0.3))",
                                filter: "blur(20px)",
                                zIndex: -1
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </motion.div>

                <motion.div className="text-center space-y-8 max-w-5xl">
                    <motion.p 
                        className="text-xl md:text-2xl font-light flex items-center justify-center gap-3 text-gray-300" 
                        variants={textVariants}
                    >
                        Hello
                        <motion.span 
                            className="inline-block text-2xl" 
                            animate={{ 
                                rotate: [0, 20, -10, 20, 0]
                            }} 
                            transition={{ 
                                repeat: Infinity, 
                                duration: 2, 
                                ease: "easeInOut",
                                repeatDelay: 3
                            }}
                        >
                            👋🏼
                        </motion.span>
                        I'm Austin-Chris
                    </motion.p>

                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold leading-tight"
                        variants={textVariants}
                    >
                        <motion.span
                            className="block bg-gradient-to-r from-green-400 via-orange-400 to-blue-400 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundSize: "200% 200%"
                            }}
                        >
                            Full-Stack Developer
                        </motion.span>
                        <motion.span
                            className="block text-gray-200 mt-2"
                            variants={textVariants}
                        >
                            & Embedded Systems Engineer
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        className="text-lg md:text-xl font-light max-w-4xl mx-auto text-gray-400 leading-relaxed"
                        variants={textVariants}
                    >
                        Crafting innovative digital solutions that seamlessly integrate cutting-edge web technologies 
                        with sophisticated embedded systems architecture.
                    </motion.p>
                </motion.div>

                <motion.a 
                    href="https://x.com/AustinChris_" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-12"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <motion.button
                        className="px-10 py-4 rounded-full bg-gradient-to-r from-green-500 via-orange-500 to-blue-500 text-white text-lg font-semibold shadow-2xl focus:outline-none relative overflow-hidden border border-gray-600"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white opacity-0"
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            Let's Connect
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </motion.button>
                </motion.a>

                {/* Professional scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    variants={textVariants}
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <motion.div
                            className="w-1 h-3 bg-green-400 rounded-full mt-2"
                            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;