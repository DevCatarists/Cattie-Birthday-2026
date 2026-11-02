import { renderWelcome } from './scenes/welcome.js?v=6';
import { renderBirthdayRealization } from './scenes/birthdayRealization.js?v=6';
import { renderBirthdayPerformance } from './scenes/birthdayPerformance.js?v=6';
import { renderFeedCattu } from './scenes/feedCattu.js?v=14';
import { renderFinalVideo } from './scenes/finalVideo.js?v=4';
import { renderBirthdayLetter } from './scenes/birthdayLetter.js?v=4';

const app = document.getElementById('app');

renderWelcome(app, () =>
  renderBirthdayRealization(app, () =>
    renderBirthdayPerformance(app, () =>
      renderFeedCattu(app, () =>
        renderFinalVideo(app, () => renderBirthdayLetter(app))
      )
    )
  )
);
