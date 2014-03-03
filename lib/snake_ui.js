(function() {
  var UI = window.SnakeUI = (window.SnakeUI || {});

  var View = UI.View = function(htmlEl) {
    this.$el = htmlEl; //does this in a $()?




  };

  var handleKeyEvent = function(event) {


    switch(event.keyCode) {
      case 37:
        this.board.snake.turn('W');
        break;
      case 38:
        this.board.snake.turn('N');
        break;
      case 39:
        this.board.snake.turn('E');
        break;
      case 40:
        this.board.snake.turn('S');
        break;
      // default:
      //   alert("WTF");
    }
  }

  View.prototype.cleanUpSnake = function() {
    var removeCoord = _.last(this.board.snake.segments);
    var x = removeCoord.x;
    var y = removeCoord.y;
    return [removeCoord, (y*9) + x + 1];

  };

  View.prototype.render = function() {

    var that = this;

    this.board.snake.segments.forEach(function(segment) {
      var x = segment.x;
      var y = segment.y;
      var index = (y*9) + x + 1;
      that.$el.find('li:nth-child(' + index + ')').addClass('snake');
      console.log(that.board.snake.segments);
    });


    this.board.apples.forEach(function(apple) {
      var x = apple.x;
      var y = apple.y;

      var index = (y*9) + x + 1;
      that.$el.find('li:nth-child(' + index + ')').addClass('apple');

    });


    // var gridArray = this.board.render();
 //    var str = ""
 //    gridArray.forEach(function(row) {
 //      str += '<pre>'
 //      str += row.join(" ");
 //      str += '</pre><br>'
 //    })
 //
 //    this.$el.html(str);

  };

  // var x = Math.floor(index / 3);
//   var y = index%3;

  View.prototype.step = function() {
    //stash in variable here.
    var cleanSnakeArr = this.cleanUpSnake();
    var removeIndex = cleanSnakeArr[1];
    var removeCoord = cleanSnakeArr[0];

    var lookForApple = this.board.snake.segments[0];

    var that = this;
    var shouldRemoveIndex = true;
    this.board.apples.forEach(function(apple) {
      if (lookForApple.x == apple.x && lookForApple.y == apple.y) {
        var index = (apple.y*9) + apple.x + 1;
        that.$el.find('li:nth-child(' + index + ')').removeClass('apple');
        that.board.apples.splice(that.board.apples.indexOf(apple), 1);
        that.board.growMySnake(removeCoord);
        shouldRemoveIndex = false;
      }
    })

    this.board.snake.move();

    if (shouldRemoveIndex) {
      this.$el.find('li:nth-child(' + removeIndex + ')').removeClass('snake');
    }

    //clean up here
    this.render();

  }


  View.prototype.start = function() {
    this.board = new window.SnakeGame.Board();

    var that = this;
    $(function() {            //handleKeyEvent(event).bind(this)
      $(document).on('keydown', handleKeyEvent.bind(that)


    );
    });

    //interval with #step.
    this.timerId = setInterval(function() {
      that.step();
    },1000);


  };



})();