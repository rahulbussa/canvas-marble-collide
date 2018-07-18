import circle from './circle.js';



const can = document.getElementById('can');
const slider = document.getElementById('myRange');
const currentVal = document.getElementById('currentValue');
can.width = window.innerWidth;
can.height = window.innerHeight;
const c = can.getContext('2d');
var no = slider.value;
currentVal.innerText = no;

window.addEventListener('resize', () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
})
slider.addEventListener('change', sliderChange);

var mouse = {
  x:10,
  y:10
}

window.addEventListener('mousemove',function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})

function randomIntFromRange(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomColor() {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680'
  ];
  return colors[randomIntFromRange(0, colors.length)];
}

function distance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

var total = [];


function init() {
  for (let i = 0; i < no; i++) {
    let radius = Math.floor(Math.random() * (18 - 15 + 1)) + 15;
    let x = randomIntFromRange(radius, window.innerWidth);
    let y = randomIntFromRange(radius, window.innerHeight);
    let dx = (Math.random() - 0.5) * 6;
    let dy = (Math.random() - 0.5) * 6;
    
    if (i !== 0) {
      for (let j = 0; j < total.length; j++) {
        if (distance(x, y, total[j].x, total[j].y)-(radius*2) < 0) {
          x = randomIntFromRange(radius, window.innerWidth);
          y = randomIntFromRange(radius, window.innerHeight);
          j = -1;
        }
      }
      total.push(new circle(x, y, dx, dy, radius, getRandomColor()));
    }else{
      total.push(new circle(x, y, dx, dy, radius, getRandomColor()));
    }
  }
}

function anim() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  window.requestAnimationFrame(anim);
  
  for (let i = 0; i < total.length; i++) {
    if(distance)
    total[i].update(total);
  }

}
init();
anim();


function sliderChange(e) {
  console.log(e.target.value);
  no = e.target.value;
  currentVal.innerText = no;
  total = [];
  c.clearRect(0, 0, innerWidth, innerHeight);
  init();
}
