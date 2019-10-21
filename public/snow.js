/* eslint-disable radix */
/* eslint-disable no-implied-eval */
/* eslint-disable no-undef */

const snowMax = 40;
const snowColor = ['#DDD', '#EEE'];
const snowEntity = '&#x1F341;';
const snowSpeed = 0.63;
const snowMinSize = 8;
const snowMaxSize = 24;
const snowRefresh = 30;
const snowStyles =
  'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;';

const snow = [];
const pos = [];
const coords = [];
const lefr = [];
let marginBottom;
let marginRight;

function randomise(range) {
  return Math.floor(range * Math.random());
}

function moveSnow() {
  for (i = 0; i <= snowMax; i++) {
    coords[i] += pos[i];
    snow[i].posY += snow[i].sink;
    snow[i].style.left = `${snow[i].posX + lefr[i] * Math.sin(coords[i])}px`;
    snow[i].style.top = `${snow[i].posY}px`;

    if (
      snow[i].posY >= marginBottom - 2 * snow[i].size ||
      parseInt(snow[i].style.left) > marginRight - 3 * lefr[i]
    ) {
      snow[i].posX = randomise(marginRight - snow[i].size);
      snow[i].posY = 0;
    }
  }

  setTimeout('moveSnow()', snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
  document.write(
    `<span id='flake${i}' style='${snowStyles}position:absolute;top:-${snowMaxSize}'>${snowEntity}</span>`
  );
}

function initSnow() {
  const snowSize = snowMaxSize - snowMinSize;
  marginBottom = document.body.scrollHeight - 5;
  marginRight = document.body.clientWidth - 15;

  for (i = 0; i <= snowMax; i++) {
    coords[i] = 0;
    lefr[i] = Math.random() * 15;
    pos[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById(`flake${i}`);
    snow[i].style.fontFamily = 'inherit';
    snow[i].size = randomise(snowSize) + snowMinSize;
    snow[i].style.fontSize = `${snow[i].size}px`;
    snow[i].style.color = snowColor[randomise(snowColor.length)];
    snow[i].style.zIndex = 1000;
    snow[i].sink = (snowSpeed * snow[i].size) / 5;
    snow[i].posX = randomise(marginRight - snow[i].size);
    snow[i].posY = randomise(
      2 * marginBottom - marginBottom - 2 * snow[i].size
    );
    snow[i].style.left = `${snow[i].posX}px`;
    snow[i].style.top = `${snow[i].posY}px`;
  }
  moveSnow();
}

function resize() {
  marginBottom = document.body.scrollHeight - 5;
  marginRight = document.body.clientWidth - 15;
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
