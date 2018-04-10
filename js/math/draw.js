function draw() {
  try {
    functionPlot({
      target: '#plot',
      data: [{
        fn: document.getElementById('eq').value,
        sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
        graphType: 'polyline'
      }]
    });
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}

document.getElementById('form').onsubmit = function (event) {
  event.preventDefault();
  draw();
};

draw();
