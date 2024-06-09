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
                this.objects[i].onUpdate(t/1000); //위치가 변할때마다 충돌감지 (예상할수없으니까 )
            }
            for (let i=0; i<this.objects.length; i++){
                for (let j=i+1; j<this.objects.length; j++){ //어떤 오브젝트랑 부딪히는지 몰라서 이중for문
                    if(this.objects[i].isColliding(this.objects[j])){ //오브젝트 i랑j랑 충돌하면
                        this.objects[i].onCollide(this.objects[j]);
                        this.objects[j].onCollide(this.objects[i]);
                    }
                }
            } //collision detection 위에서한건 비효율적일수있음 오브젝트가많아지면
            for(let i=0; i<this.objects.length; i++){
                this.objects[i].render();
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update); 
        //1초에 60번정도 실행(1/60) => 다른탭으로 가있으면 시간 간격이 길어짐ㅁ
        //터널링 -> 시간간격이 커지면 충돌을 인지못할수잇음 
        //1.시간간격이 길어지는데,1초=>60개 쪼개서 onUpdate60번실행 시가간격을 쪼갬
        //2.이동경로를 통해서 충돌처리를 진행한다 
    }
}