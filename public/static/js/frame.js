class Canvas {
    constructor(el, runTime = () => {}) {
        this.canvas = el;
        this.ctx = this.canvas.getContext('2d');
        this.fps = document.getElementById('fps');
        this.ctx.imageSmoothingEnabled = false;
        this.display = [];
        this.runTime = runTime;
        this.prev;
        window.requestAnimationFrame(this.main.bind(this));
    };

    main(time) {
        window.requestAnimationFrame(this.main.bind(this));
        if (!this.prev) this.prev = time;
        const delta = time - this.prev;
        this.prev = time;
        this.fps.innerHTML = Math.round(1000/delta);
        this.runTime(delta);

        this.ctx.fillStyle = '#00000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.display.forEach((part) => {
        //     this.ctx.fillStyle = part.colour || '#000000';
        //     this.ctx.fillRect(part.x, part.y, part.width, part.height);
        // });
    };
};

class BackgroundCanvas {
    constructor(el, img) {
        this.canvas = el;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.img = new Image();
        this.img.src = img;
    };

    drawBack(pos) {
        if (this.img.width == 0 && this.img.height == 0) return;
        let width = Math.floor(innerWidth / this.img.width) + 2;
        let height = Math.floor(innerHeight / this.img.height) + 2;

        for (let col = 0; col <= width; col++) {
            for (let row = 0; row <= height; row++) {
                this.ctx.drawImage(this.img, ((col - 1) * this.img.width) - (pos.x % this.img.width), ((row - 1) * this.img.height) - (pos.y % this.img.height));
            };
        };
    };
};