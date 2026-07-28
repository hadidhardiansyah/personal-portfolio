<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvasContainer = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let group: THREE.Group
let animationFrameId: number

const mouse = { x: 0, y: 0 }
const target = { x: 0, y: 0 }
const windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

const initThree = () => {
  if (!canvasContainer.value) return

  // Scene setup with Fog for depth
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015)

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // Group for particles
  group = new THREE.Group()
  scene.add(group)

  // Load MacBook Model
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    '/models/macbook.glb',
    (gltf) => {
      const macbook = gltf.scene
      
      // Auto-center and scale the model
      const box = new THREE.Box3().setFromObject(macbook)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      // Scale to fit screen
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 12 / maxDim
      macbook.scale.set(scale, scale, scale)
      
      // Center it
      macbook.position.sub(center.multiplyScalar(scale))
      
      // Tilt it beautifully
      macbook.rotation.x = 0.2
      macbook.rotation.y = -0.2
      
      // Add to a pivot group so we can animate it easily
      const pivot = new THREE.Group()
      pivot.name = 'macbookPivot'
      pivot.add(macbook)
      group.add(pivot)
    },
    undefined,
    (error) => {
      console.error('Error loading macbook model:', error)
    }
  )

  // Lighting for the PBR Macbook Model
  const ambientLight = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 3)
  dirLight.position.set(5, 10, 7)
  scene.add(dirLight)
  
  const backLight = new THREE.DirectionalLight(0x10b981, 2) // Emerald rim light
  backLight.position.set(-5, 5, -5)
  scene.add(backLight)

  // Helper function to create a particle field
  const createParticleField = (color: number, count: number, size: number) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    // Create a vast space of particles
    for (let i = 0; i < count; i++) {
      vertices.push((Math.random() - 0.5) * 120) // X
      vertices.push((Math.random() - 0.5) * 120) // Y
      vertices.push((Math.random() - 0.5) * 120) // Z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const material = new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })
    return new THREE.Points(geometry, material)
  }

  // Add Emerald and White data particles
  group.add(createParticleField(0x10b981, 1500, 0.2)) // Emerald
  group.add(createParticleField(0xffffff, 800, 0.15)) // White

  // Initial Entrance Animation
  group.scale.set(0.1, 0.1, 0.1)
  gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 3, ease: 'power2.out' })

  // Listeners
  document.addEventListener('mousemove', onDocumentMouseMove)
  window.addEventListener('resize', onWindowResize)

  animate()
}

const onDocumentMouseMove = (event: MouseEvent) => {
  mouse.x = event.clientX - windowHalf.x
  mouse.y = event.clientY - windowHalf.y
}

const onWindowResize = () => {
  windowHalf.x = window.innerWidth / 2
  windowHalf.y = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  target.x = mouse.x * 0.001
  target.y = mouse.y * 0.001

  // Rotate the macbook slightly faster than the background
  const pivot = group.getObjectByName('macbookPivot')
  if (pivot) {
    pivot.rotation.y += 0.002
    pivot.rotation.x = Math.sin(Date.now() * 0.001) * 0.05 // Subtle floating tilt
  }

  // Constant slow rotation of the whole matrix
  group.rotation.y += 0.001
  group.rotation.x += 0.0005

  // Parallax effect following the mouse
  const targetX = mouse.x * 0.002
  const targetY = mouse.y * 0.002

  group.rotation.y += 0.05 * (targetX - group.rotation.y)
  group.rotation.x += 0.05 * (targetY - group.rotation.x)

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  initThree()
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDocumentMouseMove)
  window.removeEventListener('resize', onWindowResize)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div class="fixed inset-0 w-full h-full -z-10 pointer-events-none" ref="canvasContainer"></div>
</template>
