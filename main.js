import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

// document.addEventListener('DOMContentLoaded', () => {
//   const start = async() => {
//     //mockWithVideo('../../assets/mock-videos/musicband1.mp4');

//     const mindarThree = new window.MINDAR.IMAGE.MindARThree({
//       container: document.body,
//       imageTargetSrc: './targets.mind',
//     });
//     const {renderer, scene, camera} = mindarThree;

//     const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
//     scene.add(light);

//     const raccoon = await loadGLTF('./Birthday.glb');
//     raccoon.scene.scale.set(0.1, 0.1, 0.1);
//     raccoon.scene.position.set(0, -0.4, 0);

//     const anchor = mindarThree.addAnchor(0);
//     anchor.group.add(raccoon.scene);

//     const mixer = new THREE.AnimationMixer(raccoon.scene);
//     raccoon.animations.forEach((clip) => {
//       mixer.clipAction(clip).play();
//     });

//     await mindarThree.start();
//     renderer.setAnimationLoop(() => {
//       mixer.update(clock.getDelta()); // Update the mixer on each frame
//       renderer.render(scene, camera);
//     });
//   }
//   start();
// });
document.addEventListener('DOMContentLoaded', async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: './targets.mind',
  });

  const {renderer, scene, camera} = mindarThree;

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const raccoon = await loadGLTF('./new3.glb');
  raccoon.scene.scale.set(0.1, 0.1, 0.1);
  raccoon.scene.position.set(0, 0, 0);
  //raccoon.scene.rotation.set(0, 0.5, 0);

  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(raccoon.scene);

  const mixer = new THREE.AnimationMixer(raccoon.scene);
  raccoon.animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    //action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
  });

  const clock = new THREE.Clock();

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    mixer.update(clock.getDelta() / 4); // Update the mixer on each frame
    renderer.render(scene, camera);
  });
});