import * as THREE from 'three'

export default class Main {

    constructor() {
        this.canvas = document.getElementById('canvas')

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas })
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearColor(0x000000, 1)
        delete this.renderer.domElement.dataset.engine

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(10, this.width / this.height, 0.1, 1000)
        this.scene.add(this.camera)

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        this.scene.add(this.ambientLight)

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        this.directionalLight.position.set(200, 500, 300)
        this.scene.add(this.directionalLight)

        this.objects()
        this.render()
    }
    
    objects() {
        this.cube = new THREE.Mesh(new THREE.BoxGeometry( 2, 2, 2 ), new THREE.MeshPhongMaterial( {color: 0xffffff} ))
        this.scene.add(this.cube)

        //this.gridHelper = new THREE.GridHelper( 10, 10 )
        //this.scene.add( this.gridHelper )

        this.camera.position.set(0, 0, 40)
    }

    windowResize() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
    }

    render() {
        this.cube.rotateX(1/100)
        this.cube.rotateZ(1/100)
        this.windowResize()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => this.render())
    }
}

let main = new Main()
