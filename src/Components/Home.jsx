import React, { useEffect, useRef } from "react"

import * as THREE from 'three'
import Cube from "./Cube"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

const Home = ({}) => {
const pillRef = useRef(null)
useEffect(() => {

 //all logic will go into useEffect
    
        //1. set up a scene
        const scene = new THREE.Scene
        //2. set up a camera
        const camera = new THREE.PerspectiveCamera(
          50,
          800 / 800,
          1,
          1000,
        )
        camera.position.z = 96;
    
        //selecting the canvas by ID
        const canvas = document.pillRef;
    
        //rendering the canvas
        const renderer = new THREE.WebGLRenderer({
          canvas,
        //   antialias: true
        });
        //setting height and width of render
        renderer.setSize(window.innerWidth, window.innerHeight);
    
        //adding to the document
        document.body.appendChild(renderer.domElement);
    
        //adding lighting 
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.castShadow = true;
        //to scene
        scene.add(ambientLight);
    
        //adding spotlight
        const spotLight = new THREE.SpotLight(0,66,32);
        // to scene
        scene.add(spotLight);
    
        //creating the shape (self explanitory names)
        const capsuleGeometry = new THREE.CapsuleGeometry(12,12,7, 4);
        const capsuleMaterial = new THREE.MeshNormalMaterial()
        //look up mesh
        const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
        scene.add(capsuleMesh)
    
        //add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
    
        //add FSP stats
        const stats = Stats();
        document.body.appendChild(stats.dom)
        
        const animate = () => {
          //rotating the shape
          capsuleMesh.rotation.x += 0.01;
          capsuleMesh.rotation.y += 0.01;
          stats.update()
          controls.update()
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
        };
    
        animate();
    }, [])

    return(
        <div>
            <div id='line' ref={pillRef}> </div>
            {/* <Cube/> */}
        </div>
        

    )
}

export default Home