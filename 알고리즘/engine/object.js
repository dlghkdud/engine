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

    tick(fn) {
        this.updateFn = fn;
    }

    update() {
        this.updateFn?.();
    }

    render() {
        this.el.style.top = (this.position[0] - this.shape.height /2) + "px";
        this.el.style.left = (this.position[1] - this.shape.width /2) + "px";
        this.shape.render();
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
}

export class Circle {
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
        this.el.style.borderRadius = "50%";
    }
}
