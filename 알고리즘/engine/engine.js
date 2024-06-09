export class Engine {
    objects = [];

    add(object) {
        this.objects.push(object);
    }

    tick(fn) {
        this.updateFn = fn;
    }

    start() {
        let startTime;
        const update = (time) => {
            if (!startTime) startTime = time;
            let t = time - startTime;
            startTime = time;
                this.updateFn?.(t/1000);
                for(let i=0; i<this.objects.length; i++){
                    this.objects[i].render();
                }
                requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        }
}