import { Engine } from "./engine";
import { Circle, Object, Rectangle } from "./object";
import "./style.css"

const container = document.createElement('div');
container.id = "container";

document.getElementById('app').appendChild(container);

const engine = new Engine();
const circle = new Circle(50);
const rect = new Rectangle(1000,10);
const obj = new  Object([500,0], circle);
const obj2 = new Object([500,500], rect);

engine.add(obj);
engine.add(obj2);
// F=ma
// Fg = 9.8m
let m = 10;
let Fg = 9.8*m;
let a = Fg/m; 
let v=0;

engine.tick(time => {
  v = v+a*time*10;
  obj.position[1] = obj.position[1] + v*time*10;
  if(obj.isColliding(obj2)){
    console.log("collid");
  }
});

engine.start();

// 물리엔진
// 구성요소 - 물체, 충돌체크, 충돌처리