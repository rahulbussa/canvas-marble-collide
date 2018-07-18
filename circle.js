import {resolveCollision} from './util-elastic-collision.js';

export default class circle{  
  constructor(x,y,dx,dy,radius,color) {
    this.x =x;
    this.y=y;
    
    this.velocity={
      x:dx,
      y:dy
    };
    this.radius = radius;
    this.color=color;
    this.mass=1;
    let el = document.getElementById('can');
    this.c = el.getContext('2d');
  }
        
  log(){
    console.log("Hi"+this.x);
  }

  distance(x1, y1, x2, y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
  }
      
  draw(){
    this.c.beginPath();
    this.c.arc(this.x, this.y,this.radius, Math.PI * 2,false);
    this.c.fillStyle=this.color;
    this.c.fill();
  }
      
  update(total){
    if(this.x+this.radius>innerWidth || this.x-this.radius<0){
      this.velocity.x=-this.velocity.x;
    }
    if(this.y+this.radius>innerHeight || this.y-this.radius<0){
      this.velocity.y=-this.velocity.y;
    }
    this.x=this.x+this.velocity.x;
    this.y=this.y+this.velocity.y;
    for (let i = 0; i < total.length; i++) {
      if(this == total[i]) continue;
      if(this.distance(this.x, this.y, total[i].x, total[i].y)-this.radius*2 < 0){
        console.log("Collided");
        resolveCollision(this, total[i]);
      }
    }
    this.draw();
  }
}