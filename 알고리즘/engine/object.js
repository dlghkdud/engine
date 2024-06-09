export class Object {
    position;
    el;
    shape;

    constructor(position, shape) {
        this.position = position;
        this.el = document.createElement('div');
        document.getElementById('container').appendChild(this.el);
        this.el.classList.add('object');

        this.shape = shape;
        this.shape.el = this.el;
    }

    render() {
        this.el.style.top = (this.position[1] - this.shape.height /2) + "px";
        this.el.style.left = (this.position[0] - this.shape.width /2) + "px";
        this.shape.render();
    }

    isColliding(obj) {
        return this.shape.isColliding(this.position, obj.position, obj.shape);
    }
}

export class Rectangle {
    width;
    height;
    el;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    render() {
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
    }
    isColliding(pos, opos, oshape) {
        const x1 = pos[0], y1=pos[1], w1=this.width, h1=this.height;
        if(oshape instanceof Rectangle){
            const x2 = opos[0], y2 = opos[1], w2 = oshape.width, h2 = oshape.height;
        if (x1<x2+w2 && x1 + w1 > x2 && y1<y2+h2 && y1+h1>y2)
            return true;
        return false;
        }
        if(oshape instanceof Circle) {
            const cx = opos[0], 
            cy = opos[1],
            r = oshape.r; 
            const closet_x = Math.max(x1, Math.min(cx, x1+w1));
            const closet_y = Math.max(y1, Math.min(cy, y1+h1));

            const dx = cx - closet_x;
            const dy = cy - closet_y;

            if(dx*dx+dy*dy <= r*r) return true;
            return false;
        }
    }
}

export class Circle {
    r;
    width;
    height;
    el;
    constructor(r) {
        this.r = r;
        this.width = r;
        this.height = r;
    }
    render() {
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.style.borderRadius = "50%";
    }
    
    isColliding(pos, opos, oshape) {
        if(oshape instanceof Circle){
            const dx = pos[0] - opos[0];
            const dy = pos[1] - opos[1];

            const distance = dx*dx + dy*dy;
            if (distance <= (this.r+oshape.r) * (this.r + oshape.r)) return true;
            return false;
        }
        if(oshape instanceof Rectangle){
            return oshape.isColliding(opos, pos, this);
        }
    }
}
