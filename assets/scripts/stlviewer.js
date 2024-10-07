"use strict";

/** A class that encapsulates an STL viewer for a specific canvas element. */
class STLViewerInstance {
    constructor(canvas, modelSrc, distScale) {
        this.canvas = canvas;
        this.modelSrc = modelSrc;
        this.distScale = distScale;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.mesh1 = null;
        this.mesh2 = null;
        this.orbiting = true;
        this.ambientLight = null;
        this.hemiLight = null;
        this.hemiLight2 = null;

        this.resizeCanvas();
        this.initScene();
        this.initObject();
        this.doFrame();

        window.addEventListener('resize', () => this.resizeCanvas(), false);
    }

    /** Resizes the canvas to match the size of the parent container. */
    resizeCanvas() {
        const parent = this.canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        if (this.renderer && this.camera) {
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }

    /** Initializes the scene elements. */
    initScene() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.resizeCanvas();

        this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, 1, 1000);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.rotateSpeed = 0.1;
        this.controls.dampingFactor = 0.1;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.autoRotate = this.orbiting;
        this.controls.autoRotateSpeed = 0.3;

        this.scene = new THREE.Scene();

        this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
        this.hemiLight.position.z = 2;
        this.hemiLight2 = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
        this.hemiLight2.position.x = 2;

        this.scene.add(this.ambientLight);
    }

    /** Initializes the STL object and the materials for wireframe and shaded options. */
    initObject() {
        const material1 = new THREE.MeshPhongMaterial({
            color: 0x181818,
            opacity: 0.85,
            transparent: true,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        });
        const material2 = new THREE.MeshPhongMaterial({
            color: 0x448ead,
            specular: 0x448ead,
            shininess: 100.0,
        });

        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            const loaders = document.getElementsByClassName("loading")
            for (let i = 0; i < loaders.length; i++) {
                loaders[i].style.display = "none";
            }
        };

        // Load the mesh for solid material (material2)
        new THREE.STLLoader(manager).load(this.modelSrc, (geometry) => {
            this.mesh2 = new THREE.Mesh(geometry, material2);
            this.mesh2.geometry.computeFaceNormals();
            this.mesh2.geometry.computeVertexNormals();
            this.scene.add(this.mesh2);
            this.scene.remove(this.mesh2);
        });

        // Load the mesh for wireframe material (material1)
        new THREE.STLLoader(manager).load(this.modelSrc, (geometry) => {
            this.mesh1 = new THREE.Mesh(geometry, material1);
            this.mesh1.geometry.computeFaceNormals();
            this.mesh1.geometry.computeVertexNormals();
            this.scene.add(this.mesh1);

            const geo = new THREE.EdgesGeometry(this.mesh1.geometry); // Create wireframe outline
            const mat = new THREE.LineBasicMaterial({
                color: 0xbbbbbb,
                linewidth: 2
            });
            const outline = new THREE.LineSegments(geo, mat);
            this.mesh1.add(outline);

            const middle = new THREE.Vector3(); // Compute the center
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(middle);
            this.mesh1.position.x = -1 * middle.x;
            this.mesh1.position.y = -1 * middle.y;
            this.mesh1.position.z = -1 * middle.z;

            const largestDimension = Math.max(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z);
            this.camera.position.z = largestDimension * this.distScale ;

            this.doFrame();
        });
    }

    /** Updates the frame for rendering. */
    doFrame() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.doFrame());
    }

    /** Changes the material of the model (wireframe or solid). */
    doMaterialChange(modelType) {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var obj = this.scene.children[i];
            this.scene.remove(obj);
        }
        if (modelType == 1) {
            this.scene.add(this.ambientLight);
            this.scene.add(this.mesh1);
        } else if (modelType == 2) {
            this.scene.add(this.hemiLight);
            this.scene.add(this.hemiLight2);
            this.scene.add(this.mesh2);
            const middle = new THREE.Vector3(); // Compute the center
            this.mesh2.geometry.computeBoundingBox();
            this.mesh2.geometry.boundingBox.getCenter(middle);
            this.mesh2.position.x = -1 * middle.x;
            this.mesh2.position.y = -1 * middle.y;
            this.mesh2.position.z = -1 * middle.z;
        }

        this.renderer.render(this.scene, this.camera);
    }

    /** Handles orbit control checkbox. */
    doControlChange(isOrbiting) {
        this.orbiting = isOrbiting;
        this.controls.autoRotate = isOrbiting;
    }
}

/** Initialize STLViewer for multiple instances. */
function STLViewerEnable(classname) {
    const models = document.getElementsByClassName(classname);
    const instance = [];
    for (let i = 0; i < models.length; i++) {
        const element = models[i];
        const model = element.getAttribute("data-src");
        const distScale = element.getAttribute("data-value");

        instance[i] = new STLViewerInstance(element.querySelector('.glcanvas'), model, distScale);
        // Attach material change handler
        document.getElementById("r1").checked = true;
        document.getElementById("c1").checked = true;
        document.getElementById('r1').onchange = function () {
            instance[i].doMaterialChange(1);
        };
        document.getElementById('r2').onchange = function () {
            instance[i].doMaterialChange(2);
        };
        document.getElementById('c1').onchange = function () {
            instance[i].doControlChange(this.checked);
        };
    }
    
}