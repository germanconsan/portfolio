import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import model from '../../../asset/model3D/Volkswagen_Golf_GL_1990.gltf';
import './ModelViewer.css';


const lerp = (start, end, t) => start + (end - start) * t;

const Model = () => {
    const { scene } = useGLTF(model);
    scene.scale.set(0.001, 0.001, 0.001); // Ajusta la escala del modelo
    scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true; // Permite que el modelo proyecte sombras
            child.receiveShadow = true; // Si deseas que también reciba sombras
        }
    });
    return <primitive object={scene} />;
};



const driverSettingOne = {
    positionInitial: {
        position: [-0.010110864365250292, 0.5719296063766225, -0.6213411168391505],
        rotation: [-2.388365358831038, -0.004678493859113023, -3.137205941495169]
    },

    positionLeft: {
        position: [-0.28192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },

    positionRight: {
        position: [0.28192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },

    positionLeftSmall: {
        position: [-0.18192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },
    positionRightSmall: {
        position: [0.18192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },

    positionLeftMoreSmall: {
        position: [-0.10192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },
    positionRightMoreSmall: {
        position: [0.10192951196386365, 0.5735444824996615, -0.6332253758589744],
        rotation: [-2.4548258310577213, 0.037018919344593684, -3.1112565276820265]
    },


    positionExplosionOne: {
        position: [0.10494667378011262, 0.5657370271517126, -0.61822188530922],
        rotation: [-2.400495451950162, 0.12458495796983513, 3.0283655835788976]
    }
}

const ModelViewer = ({ changePositionCar, isExplosion }) => {
    const [position, setPosition] = useState(driverSettingOne.positionInitial.position);
    const [rotation, setRotation] = useState(driverSettingOne.positionInitial.rotation);
    const [initialPosition, setInitialPosition] = useState(0);
    const canvasRef = useRef(); // Referencia al canvas
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMoreSmallScreen, setIsMoreSmallScreen] = useState(false);
    const touchStartX = useRef(0);  
    const touchEndX = useRef(0);
    
    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };
    
    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };  
    
    const handleTouchEnd = () => {
        const swipeDistance = touchEndX.current - touchStartX.current;
    
        if (swipeDistance > 50 && initialPosition < 1) { // Mueve a la derecha
            setInitialPosition((prevPosition) => Math.min(prevPosition + 1, 1)); // Evita que exceda el límite
        } else if (swipeDistance < -50 && initialPosition > -1) { // Mueve a la izquierda
            setInitialPosition((prevPosition) => Math.max(prevPosition - 1, -1)); // Evita que exceda el límite
        }
    
        // Reinicia las referencias para el próximo movimiento
        touchStartX.current = 0;
        touchEndX.current = 0;
    };
    
    
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        const handleResize = () => {
            setIsSmallScreen(() => {
                setInitialPosition(pre => pre)
                return window.innerWidth < 1280
            }); // Cambia 1280 por el ancho que deseas detectar
            setIsMoreSmallScreen(() => {
                setInitialPosition(pre => pre)
                return window.innerWidth < 690
            });
        };

        // Llama a la función al montar el componente para obtener el tamaño inicial
        handleResize();

        // Escucha el evento resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    useEffect(() => {
        if (isExplosion) {
            setPosition(driverSettingOne.positionExplosionOne.position);
            setRotation(driverSettingOne.positionExplosionOne.rotation);
            setTimeout(() => {
                setPosition(driverSettingOne.positionInitial.position);
                setRotation(driverSettingOne.positionInitial.rotation);
            }, 1200)

            setInitialPosition(0);
        }
    }, [isExplosion]);



    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            setInitialPosition(prev => prev - 1);
        } else if (event.key === 'ArrowRight') {
            setInitialPosition(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (initialPosition > 1) setInitialPosition(1)
        if (initialPosition < -1) setInitialPosition(-1)
        // Cambiar posición de la cámara según el valor de initialPosition


        if (initialPosition === 0) {
            setPosition(driverSettingOne.positionInitial.position);
        }


        if (isMoreSmallScreen && initialPosition === -1) {
            setPosition(driverSettingOne.positionLeftMoreSmall.position);
        } else if (isSmallScreen && initialPosition === -1) {
            setPosition(driverSettingOne.positionLeftSmall.position);
        } else if (initialPosition === -1) {
            setPosition(driverSettingOne.positionLeft.position);
        }

        if (isMoreSmallScreen && initialPosition === 1) {
            setPosition(driverSettingOne.positionRightMoreSmall.position);
        } else if (isSmallScreen && initialPosition === 1) {
            setPosition(driverSettingOne.positionRightSmall.position);
        } else if (initialPosition === 1) {
            setPosition(driverSettingOne.positionRight.position);

        }

        changePositionCar(initialPosition);
    }, [initialPosition]);

    // Para que la cámara refleje la rotación
    const Camera = () => {
        useFrame(({ camera }) => {
            // Suavizar la posición de la cámara
            const targetPosition = position; // Nuevas posiciones objetivo
            const targetRotation = rotation; // Nuevas rotaciones objetivo
            let t = 0.1; // Factor de suavizado    

            if (isExplosion) {
                t = 0.05;
            }

            // Suavizar la posición de la cámara
            camera.position.x = lerp(camera.position.x, targetPosition[0], t);
            camera.position.y = lerp(camera.position.y, targetPosition[1], t);
            camera.position.z = lerp(camera.position.z, targetPosition[2], t);

            // Suavizar la rotación de la cámara
            camera.rotation.x = lerp(camera.rotation.x, targetRotation[0], t);
            camera.rotation.y = lerp(camera.rotation.y, targetRotation[1], t);
            camera.rotation.z = lerp(camera.rotation.z, targetRotation[2], t);
        });
        return null; // Este componente no renderiza nada
    };



    const CameraLogger = () => {
        const orbitRef = useRef(); // Referencia para los controles de la cámara

        // Usamos useFrame para acceder a la cámara en cada frame
        useFrame((state) => {
            const { camera } = state;
            console.log('Camera Position:', camera.position); // Posición de la cámara
            console.log('Camera Rotation:', camera.rotation); // Rotación de la cámara
        });

        return <OrbitControls ref={orbitRef} />;
    };



    return (
        <Canvas
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={canvasRef}
            shadows
            camera={{
                position: position,
                rotation: rotation,
                fov: 75
            }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model />
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.5} />
            </mesh>
            <Camera />
            {/* <CameraLogger /> Ahora `useFrame` está dentro del Canvas */}
            <directionalLight
                castShadow
                position={[1.5, 5, 1]} // Directamente arriba del coche
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
            />
        </Canvas>
    );
};

export default ModelViewer;
