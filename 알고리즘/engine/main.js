import { Circle, Object, Rectangle } from "./object";
import "./style.css"

const container = document.createElement('div');
container.id = "container";

document.getElementById('app').appendChild(container);

const circle = new Circle(50,50);
const rect = new Rectangle(50,50);
const obj = new  Object([0,0], circle);
const obj2 = new Object([200,200], rect);
obj.render();
obj2.render();
obj.tick(()=> {
  obj.position = [
    obj.position[0], obj.position[1] + 1
  ];
});

const timer = setInterval(() => {
  obj.update();
  obj2.update();
  obj.render();
  obj2.render();
}, 1000 / 30);

// 물리엔진
// 구성요소 - 물체, 충돌체크, 충돌처리
