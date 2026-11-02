// Edit this array to replace the placeholder letter with your personal message.
const LETTER_LINES = [
  "My dearest Cattie,",
"",
"Happy Birthday to the most wonderful person in my life.",
"Every moment with you feels like one of the best moments of my life.",
"Thank you for being you — soft, kind, and endlessly lovable.",
"",
"This year, no matter what happened, you showed your true worth and achieved what you once dreamed of.",
"You carried yourself in the most amazing way.",
"I not only love you, but I am also so proud of you.",
"",
"This year, you made everyone see your true potential.",
"And although crying over little things is still your favourite hobby, this year you handled things with so much more maturity.",
"",
"Just keep growing and smiling like this, and continue making me and your family so proud of you.",
"",
"I hope this small website made you smile.",
"Here's to many more birthdays together.",
"We will celebrate each and every one of your birthdays with even more energy and excitement every year.",
"",
"With all my love,",
"",
"Cattu 💖💖",
];

export function renderBirthdayLetter(container) {
  const linesHtml = LETTER_LINES.map((l) => (l === "" ? '<p class="letter-line empty"></p>' : `<p class="letter-line">${l}</p>`)).join("");

  container.innerHTML = `
    <section class="scene letter-scene">
      <div class="glow"></div>
      <div class="float-hearts" aria-hidden="true"><span>💕</span><span>💖</span><span>🌸</span><span>✨</span></div>

      <div class="envelope" id="envelope">
        <div class="envelope-flap" id="flap"></div>
        <div class="heart-seal" id="seal" role="button" aria-label="Open envelope">❤</div>
        <div class="envelope-body">
          <div class="envelope-text">
            <p>Happy Birthday Cattie ❤️</p>
            <p>Cattu Loves You ❤️</p>
          </div>
        </div>
        <div class="letter" id="letter">
          <div class="letter-content" id="letterContent">
            ${linesHtml}
          </div>
        </div>
      </div>
    </section>
  `;

  const scene = container.querySelector('.scene');
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('in')));

  const envelope = scene.querySelector('#envelope');
  const seal = scene.querySelector('#seal');
  const letter = scene.querySelector('#letter');
  const letterLines = [...scene.querySelectorAll('.letter-line')];

  let opened = false;

  function revealMessage() {
    letterLines.forEach((line, i) => {
      setTimeout(() => line.classList.add('show'), i * 700);
    });
  }

  seal.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    seal.classList.add('pop');
    envelope.classList.add('opened');
    setTimeout(() => {
      revealMessage();
    }, 1900);
  });
}
