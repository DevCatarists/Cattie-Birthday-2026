export function renderFeedCattu(container, onDone) {
  container.innerHTML = `
    <section class="scene feed">
      <div class="float-hearts" aria-hidden="true"><span>💕</span><span>💖</span><span>🌸</span><span>✨</span></div>

      <!-- Part 1: Finding Cattu -->
      <div id="part1">
        <div class="cat-wrap">
          <img class="cat cat-sad" src="assets/cat_lonely.gif" alt="Sad Cattu" data-asset="cat-sad" />
        </div>
        <div class="lines">
          <p class="line" id="p1Line1">Cattu is here sitting lonely and hungry... 🥺</p>
          <p class="line" id="p1Line2">He wants to be fed. 🥛</p>
        </div>
        <button class="btn btn-yes hidden" id="btnFeed">YES, I'LL FEED MY CATTU 🥹</button>
      </div>

      <!-- Part 2: Feeding mini-game -->
      <div id="part2" class="hidden">
        <div class="cat-wrap game-wrap" id="gameWrap">
          <img class="game-cat" id="gameCat" src="assets/cat_milk.gif" alt="Cattu drinking milk" data-asset="cat-drink" style="width:80px;height:80px;" />
        </div>
        <p class="game-instruction">Press SPACE as fast as you can to feed Cattu! 🥛🐱</p>
        <div class="progress" id="progress"><div class="progress-fill" id="progressFill"></div></div>
        <button class="tap-btn" id="tapBtn">Tap to feed 🥛</button>
        <p class="game-hint">Keep pressing quickly or Cattu resets! 😿</p>
      </div>

      <!-- Part 3: Muscular Cattu -->
      <div id="part3" class="hidden">
        <div class="cat-wrap muscle-wrap">
          <img class="muscle-cat" src="assets/cat_body.jpg" alt="Muscular Cattu" data-asset="cat-muscular" />
        </div>
      </div>

      <!-- Part 4: Continue -->
      <div id="part4" class="hidden">
        <button class="btn btn-yes" id="btnContinue">LET'S SEE WHAT CATTU HAS PLANNED 👀</button>
      </div>
    </section>
  `;

  const scene = container.querySelector('.scene');
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('in')));

  // Configurable game values
  const START_SIZE = 80;
  const MAX_SIZE = 230;
  const SIZE_STEP = 10;
  const PRESS_THRESHOLD = 600; // ms between presses; exceeding resets

  const part1 = scene.querySelector('#part1');
  const p1Line1 = scene.querySelector('#p1Line1');
  const p1Line2 = scene.querySelector('#p1Line2');
  const btnFeed = scene.querySelector('#btnFeed');

  const part2 = scene.querySelector('#part2');
  const gameCat = scene.querySelector('#gameCat');
  const gameWrap = scene.querySelector('#gameWrap');
  const progressFill = scene.querySelector('#progressFill');
  const tapBtn = scene.querySelector('#tapBtn');

  const part3 = scene.querySelector('#part3');
  const part4 = scene.querySelector('#part4');
  const btnContinue = scene.querySelector('#btnContinue');

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

  // Part 1 flow
  (async () => {
    await wait(400);
    showLine(p1Line1);
    await wait(900);
    showLine(p1Line2);
    await wait(600);
    reveal(btnFeed);
  })();

  btnFeed.addEventListener('click', () => {
    part1.classList.add('hidden');
    reveal(part2);
    startGame();
  });

  // Part 2 game
  let gameActive = false;
  let currentSize = START_SIZE;
  let lastPress = null;
  let resetTimer = null;

  function clearResetTimer() {
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }
  }

  function scheduleResetTimer() {
    clearResetTimer();
    resetTimer = setTimeout(() => {
      if (!gameActive) return;
      resetSize();
      lastPress = null;
    }, PRESS_THRESHOLD);
  }

  function updateProgress() {
    const pct = Math.min(100, ((currentSize - START_SIZE) / (MAX_SIZE - START_SIZE)) * 100);
    progressFill.style.width = pct + '%';
  }

  function applySize() {
    gameCat.style.width = currentSize + 'px';
    gameCat.style.height = currentSize + 'px';
    updateProgress();
  }

  function resetSize() {
    currentSize = START_SIZE;
    applySize();
  }

  function onFeedPress() {
    if (!gameActive) return;
    const now = Date.now();
    if (lastPress !== null && now - lastPress > PRESS_THRESHOLD) {
      resetSize();
    }
    currentSize += SIZE_STEP;
    lastPress = now;
    applySize();
    if (currentSize >= MAX_SIZE) {
      clearResetTimer();
      completeGame();
    } else {
      scheduleResetTimer();
    }
  }

  function startGame() {
    gameActive = true;
    currentSize = START_SIZE;
    lastPress = null;
    clearResetTimer();
    if (document.activeElement) document.activeElement.blur();
    applySize();
    // keyboard
    document.addEventListener('keydown', onKeyDown);
  }

  function stopGame() {
    gameActive = false;
    clearResetTimer();
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    if (!gameActive) return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      onFeedPress();
    }
  }

  // Prevent page scroll from space while game active
  document.addEventListener('keydown', (e) => {
    if (gameActive && (e.code === 'Space' || e.key === ' ')) {
      e.preventDefault();
    }
  });

  tapBtn.addEventListener('click', onFeedPress);

  function completeGame() {
    gameActive = false;
    clearResetTimer();
    document.removeEventListener('keydown', onKeyDown);
    // Burst animation
    gameWrap.classList.add('burst');
    setTimeout(() => {
      gameWrap.classList.add('hidden');
      part2.classList.add('hidden');
      // Part 3
      reveal(part3);
      const muscleImg = part3.querySelector('.muscle-cat');
      muscleImg.classList.add('pop-in');
      setTimeout(() => {
        reveal(part4);
      }, 900);
    }, 600);
  }

  btnContinue.addEventListener('click', () => {
    scene.classList.remove('in');
    scene.classList.add('out');
    setTimeout(() => {
      if (typeof onDone === 'function') onDone();
    }, 480);
  });
}
