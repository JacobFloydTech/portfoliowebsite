'use client'
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {BokehPass} from 'three/examples/jsm/postprocessing/BokehPass.js'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import * as THREE from 'three'
import gsap from "gsap";

export default function SpacePage() {
    const ref = useRef<any>();
    useEffect(() => { 
        if (!ref.current || ref.current.children.length > 0) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.4;
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight();
        pointLight.position.set(0,0,0);
        pointLight.intensity = 300;
        scene.add(pointLight);
        const sphere = new THREE.InstancedMesh(new THREE.SphereGeometry(0.1, 50, 50), new THREE.MeshStandardMaterial({color: "white"}), 350);
        for (var i = 0; i <  350; i++) { 
            const matrix = new THREE.Matrix4();
            matrix.setPosition((Math.random() > 0.5 ? -1 : 1) * (Math.random() * 18),(Math.random() > 0.5 ? -1 : 1) * (Math.random() * 18),(Math.random() > 0.5 ? -1 : 1) * (Math.random() * 18));
            sphere.setMatrixAt(i, matrix);            
        }
        scene.add(sphere)
        
        gsap.to({ angle: 0 }, {
            angle: Math.PI * 2,
            duration: 50, 
            repeat: -1,
            onUpdate: function () {
                const currentAngle = this.targets()[0].angle;
                camera.position.set(
                    25 * Math.cos(currentAngle),
                    25 / 10 * Math.sin(currentAngle),
                    25 * Math.sin(currentAngle)
                );
                camera.lookAt(0, 0, 0);
            },
            ease: "none"
        });


        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render(scene, camera);
        const composer = new EffectComposer(renderer);
        const renderScene = new RenderPass(scene, camera);
        composer.addPass(renderScene);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.1, 0.1);
        const bokehPass = new BokehPass(scene, camera, {    
            focus:  25.0,
            aperture:   0.00001,
            maxblur:    0.2,
        });
        composer.addPass(bloomPass);
        composer.addPass(bokehPass)
        ref.current.appendChild( renderer.domElement );

        const animate = () => {
            composer.render()
            requestAnimationFrame(animate);
    
        };
        animate();

    },[])
    return (
        <div ref={ref} className="h-screen m-0 p-0">

        </div>
    );
}
