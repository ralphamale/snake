(function() {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var Snake = SnakeGame.Snake = function() {
    this.dir = "N";
    this.segments = [new Coord(6,6), new Coord(6,7)];
    // TODO: Check this works

  };

  Snake.prototype.move = function() {

    var newCoord = this.segments[0].plus(this.dir);

    // move each segment
    this.segments.unshift(newCoord);
    this.segments.pop();


  };

  // Snake.prototype.moveBody = function() {
  //   this.segments.forEach(function(segment) {
  //
  //   });
  // };

  Snake.prototype.containsSegment = function(pos) {
    // returns true if a segment occupies a pos
  };

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  };

  var Coord = SnakeGame.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  }
  //coord plus method.

  Coord.DELTA = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]}

  Coord.prototype.plus = function(dir) {
    var delta = Coord.DELTA[dir]
    var newCoord = new Coord(this.x + delta[0], this.y + delta[1]);
    return newCoord;

  }

  Snake.DIRS = ["N", "E", "S", "W"];

  var Board = SnakeGame.Board = function() {
    this.snake = new Snake();
    this.apples = [new Coord(3,3)]; //TODO
  };

  Board.DIM_X = 9;
  Board.DIM_Y = 9;

  Board.prototype.growMySnake = function(newCoord) {

    this.snake.segments.push(newCoord);

//    if this.apples


  }

  //this.board.growMySnake();

  Board.prototype.render = function() {


    var emptyGrid = _.times(Board.DIM_X, function (i) {
      return _.times(Board.DIM_Y, function (j) {
        return ".";
      });
    });


    var filledGrid = this.populate(emptyGrid);
//    console.log(filledGrid);
    return filledGrid;

  };

  Board.prototype.populate = function(grid) {

    this.snake.segments.forEach(function(segment) {
      grid[segment.y][segment.x] = 'S';
    });

    this.apples.forEach(function(apple) {
      grid[apple.y][apple.x] = 'A';
    });

    return grid;
  };





})();