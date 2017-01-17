var Building = function(floors) {
  this.what = "building",
  this.floors = floors
}

Building.prototype.destroyFloor = function(amount) {
  return this.floors - amount;
}

var myHouse = new Building(3);
myHouse.destroyFloor(2);


