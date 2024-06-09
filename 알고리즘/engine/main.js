import { Engine } from "./engine";
import { Ball, Circle, Object, Rectangle } from "./object";
import "./style.css"

const container = document.createElement('div');
container.id = "container";

document.getElementById('app').appendChild(container);

const engine = new Engine();
const rect = new Rectangle(1000,10);
const obj2 = new Object([500,500], rect);
const ball = new Ball([500,300]);
ball.a = [0,980]; //9.8m/s*100

engine.add(ball);
engine.add(obj2);
// F=ma
// Fg = 9.8m
engine.start();

document.addEventListener('keydown', e=>{
  switch(e.key){
    case "ArrowLeft":
      ball.v[0] = -500;
      break;
    case "ArrowRight":
      ball.v[0] = 500;
      break;
  }
})

document.addEventListener('keyup', e=>{
  switch(e.key){
    case "ArrowLeft":
      ball.v[0] = 0;
      break;
    case "ArrowRight":
      ball.v[0] = 0;
      break;
  }
})

// 물리엔진
// 구성요소 - 물체, 충돌체크, 충돌처리