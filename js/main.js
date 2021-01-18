
const SPEED = 1;
const NO_OF_BALLS = 100;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 500;
const MAXRADIUS = 8;
const MINRADIUS = 5;
const MARGIN = 50;


let canvas = document.getElementById("myCanvas");
canvas.style.background = "#0f0d0b";
let ctx = canvas.getContext("2d");



class Ball {
   constructor(x,y){
      this.x = x;
      this.y = y;
      this.directionx = Math.random() < 0.5 ? -1 : 1;
      this.directiony = Math.random() < 0.5 ? -1 : 1;
      this.radius = Math.floor(MINRADIUS + Math.random()*(MAXRADIUS + 1 - MINRADIUS));
      this.color = generateRandomColor();
   }

   draw = () => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
   }

   changeValue = () => {
      this.x = this.x + this.directionx * SPEED;
      this.y = this.y + this.directiony * SPEED;

      if (this.x + this.radius >= CANVAS_WIDTH || this.x - this.radius <= 0) {
         this.directionx *= -1;
       }
       if (this.y - this.radius <= 0 || this.y + this.radius >= CANVAS_HEIGHT) {
         this.directiony *= -1;
       }
   }
}
   let generateRandomColor = () => {
      var red = Math.floor(Math.random() * 255);
      var blue = Math.floor(Math.random() * 255);
      var green = Math.floor(Math.random() * 255);
   
      return `rgb(${red},${green},${blue})`
   }

   /**
    * Detectes the Collision and resolves
    * @param  {Object} ball Current ballList
    */

   let collisionDetection = (ball) => {
      for (newball in ballList) {
         if((ball.x != ballList[newball].x) && (ball.y != ballList[newball].y)){
            var dx = ball.x - ballList[newball].x;
            var dy = ball.y - ballList[newball].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball.radius + ballList[newball].radius) {
               ball.directionx *= -1;
               ball.directiony *= -1;
               
            }
         }
       }
      
   }

   let isColliding = (ball) => {
      for (newball in ballList) {
        var dx = ball.x - ballList[newball].x;
        var dy = ball.y - ballList[newball].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < ball.radius + ballList[newball].radius) {
    
          return true;
        }
      }
    
      return false;
    }


   let animate = () =>{
      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      ballList.forEach((ball) => {
         ball.changeValue();
         ball.draw();
         collisionDetection(ball);
      });   
   }

   let ballList= [];

   let render = () => {
      for (var i = 0; i < NO_OF_BALLS ; i++) {

         do{
            x=Math.floor(Math.random() * CANVAS_WIDTH-MARGIN);
            y=Math.floor(Math.random() * CANVAS_HEIGHT-MARGIN);
            var ball = new Ball(x,y);
         }while(isColliding(ball));
         ballList.push(ball);
      }
      
   }

render();
setInterval(animate, 1000 / 60);
// animate();



