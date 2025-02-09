/* global canvas WIDTH HEIGHT ctx imagemanager audiomanager */

function FlappyBird(flapPower, gravity) {
    this.w = 34;
    this.h = 24;
    this.x = 384 - this.w / 2;
    this.y = 220 - this.h / 2;
    this.vy = 0;
    this.color = (Math.random() < 0.5) ? "red" : "yellow";
    this.flapPower = flapPower;
    this.gravity = gravity;
    this.rotate = false;
    this.onGround = false;

    var rotateAnimation = 0;
    var imageAnimation = 0;
    var positionOfWing = "up";

    this.flap = function () {
        this.vy = -this.flapPower;
        rotateAnimation = 0;
        audiomanager.play("wing");
    };

    this.update = function (dt) {
        // Update position
        this.vy += this.gravity * dt;
        this.y += this.vy * dt;

        // Handles when the bird touches the ground (which is at y: 400)
        if (this.y + this.h > 400) {
            if (!this.onGround) {
                this.onGround = true;
                audiomanager.play("oof", 0.3);
            }
            this.vy = 0;
            this.y = 400 - this.h;
        }
    };

    this.render = function (dt) {
        // Flappy bird rotation
        var rotation = 0;
        if (this.rotate) {
            if (rotateAnimation < 100) {
                rotation = Math.sin(rotateAnimation / 100 * Math.PI / 2) * 135 - 45;
                if (!this.onGround)
                    rotateAnimation += (5 * gravity / 60) * dt;
            }
            else {
                rotation = 90;
            }
        }

        // Flappy bird image animation
        imageAnimation += 60 * dt;
        if (imageAnimation >= 4 && !this.onGround) {
            imageAnimation = 0;
            switch (positionOfWing) {
                case "up": positionOfWing = "mid"; break;
                case "mid": positionOfWing = "down"; break;
                case "down": positionOfWing = "up"; break;
            }
        }

        // Draw flappy bird
        ctx.save();
        ctx.translate(WIDTH / 2, this.y + this.h / 2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.drawImage(imagemanager.get(this.color + "bird-" + positionOfWing + "flap"), -this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    };
}
