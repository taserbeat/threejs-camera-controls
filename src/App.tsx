import { useEffect, useRef } from "react";
import * as THREE from "three";

import "./App.css";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// サイズ
const cameraAspectSizes = {
  width: 800,
  height: 600,
};

// シーン
const scene = new THREE.Scene();

// ジオメトリ
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);

// マテリアル
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: false,
});

// メッシュ
const mesh = new THREE.Mesh(boxGeometry, material);
scene.add(mesh);

// カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  cameraAspectSizes.width / cameraAspectSizes.height,
  0.1,
  3000
);

camera.position.z = 3;
scene.add(camera);

// レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function App() {
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refDiv.current?.appendChild(renderer.domElement);

    const updateRender = () => {
      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(updateRender);
    };

    updateRender();

    return () => {
      refDiv.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="App">
      <div className="scene" ref={refDiv}></div>
    </div>
  );
}

export default App;
