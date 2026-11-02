export function renderBirthdayPerformance(container, onDone) {
  container.innerHTML = `
    <section class="scene performance">
      <div class="video-wrap">
        <video id="bdayVideo" class="bday-video" src="assets/cat_song.mp4" poster="assets/cat-placeholder.svg" loop playsinline preload="metadata" data-asset="birthday-video"></video>
      </div>

      <div class="post-video hidden" id="postVideo">
        <p class="post-text">Want to see what Cattu is doing? 👀</p>
        <button class="btn btn-yes" id="btnCheating">Yes, he must be cheating 😤</button>
      </div>
    </section>
  `;

  const scene = container.querySelector('.scene');
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('in')));

  const video = scene.querySelector('#bdayVideo');
  const postVideo = scene.querySelector('#postVideo');
  const btnCheating = scene.querySelector('#btnCheating');

  function revealPost() {
    postVideo.classList.remove('hidden');
    void postVideo.offsetWidth;
    requestAnimationFrame(() => postVideo.classList.add('show'));
  }

  // Attempt autoplay with sound; fall back to muted if blocked by the browser.
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
  }

  // Text and button are visible from the start.
  setTimeout(() => {
    revealPost();
  }, 400);

  btnCheating.addEventListener('click', () => {
    scene.classList.remove('in');
    scene.classList.add('out');
    setTimeout(() => {
      if (typeof onDone === 'function') onDone();
    }, 480);
  });
}
