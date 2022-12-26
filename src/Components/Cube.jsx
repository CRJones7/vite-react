import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';


const Box = () => {
    const CubeRef = useRef(null)
    useEffect(() => {
        //all logic will go into useEffect
    
        //1. set up a scene
        const scene = new THREE.Scene
        //2. set up a camera
        const camera = new THREE.PerspectiveCamera(
          50,
          200 / 200,
          1,
          1000,
        )
        camera.position.z = 96;
    
        //selecting the canvas by ID
        const canvas = document.current(CubeRef);
    
        //rendering the canvas
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true
        });
        //setting height and width of render
        renderer.setSize(100, 100);
    
        //adding to the document
        document.body.appendChild(renderer.domElement);
    
        //adding lighting 
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.castShadow = true;
        //to scene
        scene.add(ambientLight);
    
        //adding spotlight
        const spotLight = new THREE.SpotLight(0,64,32);
        // to scene
        scene.add(spotLight);
    
        //creating the shape (self explanitory names)
        const boxGeometry = new THREE.BoxGeometry(7,7,17);
        const boxMaterial = new THREE.MeshNormalMaterial()
        //look up mesh
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        scene.add(boxMesh)
    
        //add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
    
        //add FSP stats
        const stats = Stats();
        document.body.appendChild(stats.dom)
        
        const animate = () => {
          //rotating the shape
          boxMesh.rotation.x += 0.01;
          boxMesh.rotation.y += 0.01;
          stats.update()
          controls.update()
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
        };
    
        animate();
      },[])

      return(
            <div>
            <div id="viteReactThreeCanvas" ref={CubeRef}></div>
            </div>
      )
}
export default Box