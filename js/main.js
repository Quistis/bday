// import { typeText } from './typing.js';

// const title = document.getElementById('title');
// const subtitle = document.getElementById('subtitle');
// const button = document.getElementById('surpriseBtn');
// const hiddenMessage = document.getElementById('hiddenMessage');
// const heartsContainer = document.getElementById('hearts');

// const giftBox = document.getElementById('giftBox');
// const giftScreen = document.getElementById('giftScreen');
// const mainContent = document.getElementById('mainContent');
// const openSound = document.getElementById('openSound');

// const storyLines = document.querySelectorAll('.story-line');

// const titleText = 'С днём рождения, Януля ❤️';
// const subtitleText = 'Ты мой любимый человек и источник моего хорошего настроения 😄💖';

// /* УТИЛИТА ЗАДЕРЖКИ */
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// /* ФУНКЦИЯ ПРОИГРЫВАНИЯ ИСТОРИИ (ПО КНОПКЕ) */
// async function playStoryLines() {
//   for (let i = 0; i < storyLines.length; i++) {
//     storyLines[i].classList.add('show');
//     await delay(1800);
//   }
// }

// /* ОТКРЫТИЕ ПОДАРКА */
// giftBox.addEventListener('click', async () => {
//   openSound.currentTime = 0;
//   openSound.play();

//   giftScreen.classList.add('fade-out');

//   await delay(1000);

//   giftScreen.style.display = 'none';
//   mainContent.classList.remove('hidden');
//   mainContent.classList.add('show');

//   await startMainContent();
// });

// /* ОСНОВНОЙ СЦЕНАРИЙ (БЕЗ storyLines!) */
// async function startMainContent() {
//   // очистка (на всякий случай)
//   title.textContent = '';
//   subtitle.textContent = '';

//   storyLines.forEach(line => {
//     line.classList.remove('show');
//   });

//   // Заголовок
//   typeText(title, titleText, 60);
//   await delay(2500);

//   // Подзаголовок
//   typeText(subtitle, subtitleText, 35);
//   await delay(2000);

//   // 👉 здесь ПАУЗА — ждём действия пользователя
// }

// /* КНОПКА */
// button.addEventListener('click', async () => {
//   button.disabled = true;
//   button.textContent = 'Я тебя люблю 💖';

//   await playStoryLines();

//   hiddenMessage.classList.remove('hidden');
//   hiddenMessage.classList.add('show');

// });

// /* СЕРДЕЧКИ */
// function createHeart() {
//   const heart = document.createElement('div');
//   heart.classList.add('heart');
//   heart.innerHTML = '💖';

//   heart.style.left = Math.random() * 100 + 'vw';
//   heart.style.fontSize = Math.random() * 20 + 15 + 'px';
//   heart.style.animationDuration = (Math.random() * 3 + 5) + 's';

//   heartsContainer.appendChild(heart);

//   setTimeout(() => heart.remove(), 8000);
// }

// setInterval(createHeart, 300);


import { typeText } from './typing.js';

const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const button = document.getElementById('surpriseBtn');
const hiddenMessage = document.getElementById('hiddenMessage');
const heartsContainer = document.getElementById('hearts');

const giftBox = document.getElementById('giftBox');
const giftScreen = document.getElementById('giftScreen');
const mainContent = document.getElementById('mainContent');
const openSound = document.getElementById('openSound');

const storyLines = document.querySelectorAll('.story-line');

/* 🎵 МУЗЫКА */
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

let isPlaying = true;
bgMusic.volume = 0.2;

/* УТИЛИТА */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ПЛАВНАЯ ГРОМКОСТЬ */
function fadeVolume(target, duration = 500) {
  const step = (target - bgMusic.volume) / (duration / 50);

  const interval = setInterval(() => {
    let v = bgMusic.volume + step;

    if (
      (step > 0 && v >= target) ||
      (step < 0 && v <= target)
    ) {
      bgMusic.volume = target;
      clearInterval(interval);
    } else {
      bgMusic.volume = v;
    }
  }, 50);
}

/* ПЕРЕКЛЮЧЕНИЕ МУЗЫКИ */
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
  } else {
    bgMusic.play();
    musicToggle.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});

/* ИСТОРИЯ */
async function playStoryLines() {
  fadeVolume(0.1, 500);

  for (let i = 0; i < storyLines.length; i++) {
    storyLines[i].classList.add('show');
    await delay(1800);
  }

  fadeVolume(0.4, 800);
}

/* ОТКРЫТИЕ ПОДАРКА */
giftBox.addEventListener('click', async () => {
  openSound.currentTime = 0;
  openSound.play();

  bgMusic.volume = 0.1;
  bgMusic.currentTime = 0;

  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.log('Autoplay blocked:', err);
    });
  }

  giftScreen.classList.add('fade-out');

  await delay(1000);

  giftScreen.style.display = 'none';
  mainContent.classList.remove('hidden');
  mainContent.classList.add('show');

  await startMainContent();
});

/* СЦЕНАРИЙ */
async function startMainContent() {
  title.textContent = '';
  subtitle.textContent = '';

  storyLines.forEach(line => line.classList.remove('show'));

  typeText(title, 'С днём рождения, Януля ❤️', 60);
  await delay(2500);

  typeText(subtitle, 'Ты мой любимый человек и источник моего хорошего настроения 😄💖', 35);
}

/* КНОПКА */
button.addEventListener('click', async () => {
  button.disabled = true;
  button.textContent = 'Я тебя люблю 💖';

  await playStoryLines();

  // hiddenMessage.classList.remove('hidden');
  // hiddenMessage.classList.add('show');

});

/* СЕРДЕЧКИ */
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '💖';

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 20 + 15 + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 5) + 's';

  heartsContainer.appendChild(heart);

  const lifeTime = 6000;

  setTimeout(() => {
    // 🔥 гарантируем, что браузер применил стили
    requestAnimationFrame(() => {
      heart.classList.add('fade-out');
    });

    // удаляем строго после анимации
    setTimeout(() => {
      heart.remove();
    }, 1200);

  }, lifeTime);
}

setInterval(createHeart, 300);
