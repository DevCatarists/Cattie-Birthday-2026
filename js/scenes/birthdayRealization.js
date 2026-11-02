export function renderBirthdayRealization(container, onDone) {
  container.innerHTML = `
    <section class="scene birthday">
      <div class="float-hearts" aria-hidden="true"><span>💕</span><span>💖</span><span>🌸</span><span>✨</span></div>
      <div class="cat-wrap" id="thinkCat">
        <img class="cat cat-think" src="assets/cat_realise.gif" alt="Cattu Realise" data-asset="cat-think" />
      </div>

      <div class="lines" id="lines1">
        <p class="line">Hmmmm... 🤔</p>
        <p class="line">Wait a minute...</p>
        <p class="line question-line">What day is it today? 👀</p>
      </div>

      <div class="date-card hidden" id="dateCard">
        <div class="date-day">3</div>
        <div class="date-month">NOVEMBER</div>
        <div class="date-year">2026</div>
        <div class="date-cake">🎂</div>
      </div>

      <div class="lines hidden" id="lines2">
        <p class="line big">OHHHHH YESSSS!!! 😭🐱</p>
        <p class="line big">It's my Cattie's birthday!!! 💖🎉</p>
      </div>

      <div class="cat-wrap hidden" id="excitedCat">
        <video class="cat cat-excited" src="assets/cat_cake.mp4" playsinline preload="metadata" data-asset="cat-cake-video"></video>
      </div>

      <div class="confetti" id="confetti" aria-hidden="true"></div>
    </section>
  `;

  const scene = container.querySelector('.scene');
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('in')));

  const thinkCat = scene.querySelector('#thinkCat');
  const lines1Wrap = scene.querySelector('#lines1');
  const lines1 = [...scene.querySelectorAll('#lines1 .line')];
  const dateCard = scene.querySelector('#dateCard');
  const excitedCat = scene.querySelector('#excitedCat');
  const lines2Wrap = scene.querySelector('#lines2');
  const lines2 = [...scene.querySelectorAll('#lines2 .line')];
  const confetti = scene.querySelector('#confetti');

  function showLine(el) {
    el.classList.add('show');
  }

  function reveal(el) {
    el.classList.remove('hidden');
    void el.offsetWidth;
    requestAnimationFrame(() => el.classList.add('show'));
  }

  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  function launchConfetti(root) {
    const pieces = ['💖', '💕', '🎉', '✨', '🌸', '🐱', '🎂'];
    for (let i = 0; i < 32; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-piece';
      span.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.animationDelay = Math.random() * 0.6 + 's';
      span.style.fontSize = 14 + Math.random() * 14 + 'px';
      root.appendChild(span);
      setTimeout(() => span.remove(), 2600);
    }
  }

  async function run() {
    // Part 1
    await wait(400);
    showLine(lines1[0]);
    await wait(900);
    showLine(lines1[1]);
    await wait(900);
    showLine(lines1[2]);

    await wait(1000);

    // Part 2
    reveal(dateCard);
    await wait(120);
    dateCard.classList.add('pop');
    await wait(1400);

    // Part 3
    thinkCat.classList.add('hidden');
    lines1Wrap.classList.add('hidden');
    dateCard.classList.add('hidden');
    reveal(lines2Wrap);
    await wait(400);
    showLine(lines2[0]);
    await wait(900);
    showLine(lines2[1]);
    await wait(400);
    reveal(excitedCat);
    await wait(100);
    const video = excitedCat.querySelector('video');
    if (video) {
      const startPlayback = () => {
        video.classList.add('vid-ready');
        try { video.currentTime = 0; } catch (e) {}
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      };
      if (video.readyState >= 1) {
        video.classList.add('vid-ready');
        startPlayback();
      } else {
        video.addEventListener('loadedmetadata', () => { video.classList.add('vid-ready'); startPlayback(); }, { once: true });
        video.load();
      }
    }
    await wait(300);
    launchConfetti(confetti);
    // Wait for the excited cat video to finish before moving on (fallback timeout).
    if (video) {
      await new Promise((resolve) => {
        let done = false;
        const finish = () => { if (!done) { done = true; resolve(); } };
        video.addEventListener('ended', finish, { once: true });
        setTimeout(finish, 12000);
      });
    } else {
      await wait(3000);
    }
    await wait(800);
    scene.classList.remove('in');
    scene.classList.add('out');
    await wait(480);
    if (typeof onDone === 'function') onDone();
  }

  run();
}
