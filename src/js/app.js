var UI = require('ui'),
  Vector2 = require('vector2'),
  Accel = require('ui/accel'),
  ajax = require('ajax');

  // Create a dynamic window
  var wind = new UI.Window();

// Add a rect element
var rect = new UI.Rect({
  size: new Vector2(50, 90)
});

wind.add(rect);

wind.show();

Accel.init()
var IP = '129.161.68.32'
wind.on('show', function(){
  ajax({
      url: 'http://'+IP+':5000/begin'
    },
    function(data, status, request) {
      console.log('Ended session');
    },
    function(error, status, request) {
      console.log('(onwindowhide): The ajax request failed: ' + error);
    }
  );
})

wind.on('hide', function(){
  ajax({
      url: 'http://'+IP+':5000/end'
    },
    function(data, status, request) {
      console.log('Ended session');
    },
    function(error, status, request) {
      console.log('(onwindowhide): The ajax request failed: ' + error);
    }
  );
})

Accel.on('data', function(data) {
  console.log(data.samples)
  ajax({
      url: 'http://'+IP+':5000/accel',
      type: 'json',
      method: 'post',
      data: {
        'accel': data.accels
      }
    },
    function(data, status, request) {
      console.log('Sent accel data successfully');
    },
    function(error, status, request) {
      console.log('(accelondata): The ajax request failed: ' + error);
    }
  );
})

