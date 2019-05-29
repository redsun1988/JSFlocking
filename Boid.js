class Boid {
    constructor(x, y) {
        this.maxAcceleration = 0.2;
        this.maxVelocity = 5;
        this.possition = new Point2D(x, y);
        this.velocity = new Point2D(-10*Math.random() + 5,-10*Math.random() + 5);
        this.acceleration = new Point2D();
    }

    update = (flock, maxWidth, maxHeight) => {
        this.possition.X += this.velocity.X;
        this.possition.Y += this.velocity.Y;

        this.acceleration = this.calcAcceleration(flock);

        this.velocity.X += this.acceleration.X;
        this.velocity.Y += this.acceleration.Y;

       // this.velocity = Geometry2D.limit(this.velocity, 
       //     this.maxVelocity);

        this.acceleration.X = 0;
        this.acceleration.Y = 0;
        this.checkBoundarys(maxWidth, maxHeight);
    }


    calcAcceleration = (flock) => {

        var steering = new Point2D();
        var alignment = new Point2D();
        var cohesion = new Point2D();
        var separation = new Point2D();

        var maxDistance = 100;
        var count = 0;
       
        for(let boid of flock) {
            var dist = Geometry2D.distanse(boid.possition, this.possition);
            if (dist < maxDistance && boid != this) {
                //Calc Alignment
                alignment.X += boid.velocity.X;
                alignment.Y += boid.velocity.Y;
        
                //Calc Cohesion
                cohesion.X += boid.possition.X;
                cohesion.Y += boid.possition.Y;

                //Calc Separation
                separation.X += (this.possition.X - boid.possition.X) / dist;
                separation.Y += (this.possition.Y - boid.possition.Y) / dist;

                count++;
            }
        }
        if (count != 0) {
            //Calc Alignment
            alignment.X /= count;
            alignment.Y /= count;
            alignment = Geometry2D.setMagnitude(alignment, 
                this.maxVelocity);
            alignment.X -= this.velocity.X;
            alignment.Y -= this.velocity.Y;
            alignment = Geometry2D.limit(alignment, 
                this.maxAcceleration);
            steering.X += alignment.X;
            steering.Y += alignment.Y;


            //Calc Cohesion
            cohesion.X /= count;
            cohesion.Y /= count;
            cohesion.X -= this.possition.X;
            cohesion.Y -= this.possition.Y;
            cohesion = Geometry2D.setMagnitude(cohesion, 
                this.maxVelocity);
            cohesion.X -= this.velocity.X;
            cohesion.Y -= this.velocity.Y;
            cohesion = Geometry2D.limit(cohesion, 
                this.maxAcceleration);
            steering.X += cohesion.X;
            steering.Y += cohesion.Y;

            //Calc Separation
            separation.X /= count;
            separation.Y /= count;
            separation = Geometry2D.setMagnitude(separation, 
                this.maxVelocity);
            separation.X -= this.velocity.X;
            separation.Y -= this.velocity.Y;
            separation = Geometry2D.limit(separation, 
                this.maxAcceleration);

            steering.X += separation.X;
            steering.Y += separation.Y;

        }

        return steering;
    }

    checkBoundarys = (maxWidth, maxHeight) => {
        if (this.possition.X > maxWidth)
            this.possition.X = 0;
        if (this.possition.X < 0)
            this.possition.X = maxWidth;
        if (this.possition.Y > maxHeight)
            this.possition.Y = 0;
        if (this.possition.Y < 0)
            this.possition.Y = maxHeight;
    }

    draw = (ctx) => {
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.arc(this.possition.X, this.possition.Y, 5, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}