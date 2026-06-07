import { useMemo } from 'react'
import { useTexture, useGLTF } from '@react-three/drei'
import { RepeatWrapping, Group, Mesh, MeshStandardMaterial, Box3, Vector3 } from 'three'

const TREE_COUNT = 60

function bakeAndCenterMesh(mesh: Mesh, group: Group) {
  const geo = mesh.geometry.clone()
  geo.applyMatrix4(mesh.matrixWorld)

  geo.computeBoundingBox()
  const box = geo.boundingBox!
  const center = new Vector3()
  box.getCenter(center)
  const pos = new Vector3()
  geo.getAttribute('position').getX(0)
  const positions = geo.getAttribute('position')
  for (let i = 0; i < positions.count; i++) {
    positions.setXYZ(
      i,
      positions.getX(i) - center.x,
      positions.getY(i) - box.min.y,
      positions.getZ(i) - center.z
    )
  }
  positions.needsUpdate = true
  geo.computeVertexNormals()

  const mat = (mesh.material as MeshStandardMaterial).clone()
  const newMesh = new Mesh(geo, mat)
  group.add(newMesh)
}

function createTree(scene: Group): Group {
  const root = new Group()
  scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      bakeAndCenterMesh(child as Mesh, root)
    }
  })
  return root
}

function Trees() {
  const { scene } = useGLTF('/textures/trees/scene.gltf')

  const trees = useMemo(() => {
    const clones: Group[] = []
    for (let i = 0; i < TREE_COUNT; i++) {
      let angle = Math.random() * Math.PI * 2
      if (i < TREE_COUNT * 0.7) {
        angle = Math.PI / 2 + Math.random() * Math.PI
      }
      
      const radius = 8 + Math.random() * 25
      const tree = createTree(scene)
      tree.position.set(Math.cos(angle) * radius, -5.5, Math.sin(angle) * radius)
      tree.scale.setScalar(0.155 + Math.random() * 0.104)
      tree.rotation.y = Math.random() * Math.PI * 2
      tree.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      clones.push(tree)
    }
    return clones
  }, [scene])

  const isMechaWalking = useAppStore((s) => s.isMechaWalking)

  useFrame((_, delta) => {
    if (isMechaWalking) {
      trees.forEach((tree) => {
        tree.position.z += delta * 4.0
        
        if (tree.position.z > 20) {
          tree.position.z = -50 - Math.random() * 20
          
          let newX = 8 + Math.random() * 25
          if (Math.random() < 0.7) {
            newX = -8 - Math.random() * 25
          } else {
            newX = 8 + Math.random() * 25
          }
          tree.position.x = newX
        }
      })
    }
  })

  return (
    <>
      {trees.map((tree, i) => (
        <primitive key={i} object={tree} />
      ))}
    </>
  )
}

import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../../store/useAppStore'

export default function ForestEnvironment() {
  const groundTexture = useTexture('/textures/ground/floor_13.png')
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100, 100)
  
  const isMechaWalking = useAppStore((s) => s.isMechaWalking)

  useFrame((_, delta) => {
    if (isMechaWalking) {
      groundTexture.offset.y += delta * 0.5
    }
  })

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.0, 0]} receiveShadow>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial map={groundTexture} />
      </mesh>
      <Trees />
    </>
  )
}
