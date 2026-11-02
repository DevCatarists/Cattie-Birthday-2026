export function renderWelcome(container, onDone) {
  container.innerHTML = `
    <section class="scene welcome">
      <div class="float-hearts" aria-hidden="true"><span>💕</span><span>💖</span><span>🌸</span><span>✨</span></div>
      <div class="decor" aria-hidden="true">
        <span>💕</span>
        <span>💖</span>
        <span>🐾</span>
        <span>💗</span>
      </div>
      <div class="cat-wrap">
        <img class="cat cat-welcome" src="assets/cat_hello.gif" alt="Hello Cattie" data-asset="cat-gif" />
      </div>
      <h1 class="title">Hey Cattie! 💕</h1>
      <p class="from">— a message from Cattu 🐱</p>
      <p class="msg">I'm so happy you're here. I made something special, just for you, and I can't wait to share it. 🌸</p>
      <p class="question">Are you ready to begin? ✨</p>
      <div class="btns">
        <button class="btn btn-yes" id="btnYes">YES, LET'S GO! 💖</button>
        <button class="btn btn-maybe" id="btnMaybe">Umm... maybe? 🐱</button>
      </div>
      <p class="reaction" id="reaction" hidden></p>
    </section>
  `;

  const scene = container.querySelector('.scene');
  const btnYes = container.querySelector('#btnYes');
  const btnMaybe = container.querySelector('#btnMaybe');
  const reaction = container.querySelector('#reaction');

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scene.classList.add('in'));
  });

  let maybeReady = false;

  function complete() {
    scene.classList.remove('in');
    scene.classList.add('out');
    setTimeout(() => onDone(), 480);
  }

  btnYes.addEventListener('click', complete);

  btnMaybe.addEventListener('click', () => {
    if (!maybeReady) {
      reaction.textContent = 'Main Jaa rha hoon BYE! Ready krr😤';
      reaction.hidden = false;
      requestAnimationFrame(() => reaction.classList.add('show'));
      btnMaybe.textContent = "OKAY OKAY, I'M READY 😭";
      btnMaybe.classList.add('ready');
      maybeReady = true;
    } else {
      complete();
    }
  });
}
