var can = document.getElementById("can");
var c = can.getContext("2d");
var cir = [];
var r = 30;
var balls = 100;
can.height = 550;
can.width = window.innerWidth;
var id = undefined;

check = (v) => {
  return Math.floor(v.r + v.y) == can.height;
};

var Circle = function (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = (Math.random() - 0.5) * 5;
  this.dy = 3;
  this.drop = () => {
    if (this.y + this.r + this.dy > can.height) this.dy *= -0.9;
    else {
      this.dy += 0.33;
    }
    if (this.x + this.r >= can.width || this.x <= this.r) this.dx *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = "#ac05bb";
    c.fill();
    c.stroke();
  };
};

for (let i = 0; i < balls; i++) {
  cir.push(
    new Circle(
      Math.round(Math.random() * (can.width - 2 * r)) + r,
      Math.round(Math.random() * (can.height - 2 * r)) + r,
      r
    )
  );
  // cir[i].drop();
}
function rep() {
  id = requestAnimationFrame(rep);
  c.clearRect(0, 0, can.width, can.height);
  for (let i = 0; i < cir.length; i++) {
    cir[i].drop();
  }

  let ch = cir.every(check);
  if (ch == true) {
    cancelAnimationFrame(id);
  }
  console.log(ch);
}
