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

// カーソル位置
let [cursorX, cursorY] = [0, 0];

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function App() {
  const refDiv = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent) => {
    cursorX = event.clientX / window.innerWidth - 0.5;
    cursorY = event.clientY / window.innerHeight - 0.5;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    refDiv.current?.appendChild(renderer.domElement);

    const updateRender = () => {
      // カメラ制御
      camera.position.x = cursorX * 3;
      camera.position.y = cursorY * 3;

      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(updateRender);
    };

    updateRender();

    return () => {
      refDiv.current?.removeChild(renderer.domElement);
      removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <div className="scene" ref={refDiv}></div>
    </div>
  );
}

export default App;
