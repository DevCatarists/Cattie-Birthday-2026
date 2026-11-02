export function renderFinalVideo(container, onDone) {
  container.innerHTML = `
    <section class="scene final-video">
      <video id="finalVideo" class="final-video-el" src="assets/Bday_Film.mp4" poster="assets/cat-placeholder.svg" controls playsinline preload="metadata" data-asset="final-video"></video>
    </section>
  `;

  const scene = container.querySelector('.scene');
  // Immersive: fade in
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('in')));

  const video = scene.querySelector('#finalVideo');

  if (video) {
    const tryPlay = (muted) => {
      video.muted = muted;
      video.play().catch(() => {
        if (!muted) tryPlay(true);
      });
    };
    const markReady = () => video.classList.add('vid-ready');
    if (video.readyState >= 1) {
      markReady();
      tryPlay(false);
    } else {
      video.addEventListener('loadedmetadata', () => { markReady(); tryPlay(false); }, { once: true });
      video.load();
    }

    video.addEventListener('ended', () => {
      scene.classList.remove('in');
      scene.classList.add('out');
      setTimeout(() => {
        if (typeof onDone === 'function') onDone();
      }, 480);
    }, { once: true });
  }
}
