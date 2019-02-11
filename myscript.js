var context = null;
var usingWebAudio = true;
if (typeof AudioContext !== 'undefined') {
  context = new AudioContext();
} else if (typeof webkitAudioContext !== 'undefined') {
  context = new webkitAudioContext();
} else {
  usingWebAudio = false;
}

var playing = false;
var osc = null;
var freq = 100;
var STEP_CONSTANT = Math.pow(2.0, 1.0/12.0);
//second set of variables
var playing2 = false;
var osc2 = null;
var freq2 = 200;
var STEP_CONSTANT2 = Math.pow(2.0, 1.0/12.0);
//third set of variables
var playing3 = false;
var osc3 = null;
var freq3 = 300;
var STEP_CONSTANT3 = Math.pow(2.0, 1.0/12.0);


function toggle() {
  var button = document.getElementById("toggle");
  if (playing && osc) {
    playing = false;
    osc.stop(0);
    button.value = "Play";
  } else {
    playing = true;
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.frequency.value = freq;
    osc.start(0);
    button.value = "Stop";
  }
  if (playing2 && osc2) {
    playing2 = false;
    osc2.stop(0);
    button.value = "Play";
  } else {
    playing2 = true;
    osc2 = context.createOscillator();
    osc2.connect(context.destination);
    osc2.frequency.value = freq2;
    osc2.start(0);
    button.value = "Stop";
  }
    if (playing3 && osc3) {
    playing3 = false;
    osc3.stop(0);
    button.value = "Play";
  } else {
    playing3 = true;
    osc3 = context.createOscillator();
    osc3.connect(context.destination);
    osc3.frequency.value = freq3;
    osc3.start(0);
    button.value = "Stop";
  }

}

function updateFreq(newFreq) {
  freq = newFreq;
  if (osc) {
    osc.frequency.value = freq;
  }
  var text = document.getElementById("freqText").value = freq;
  var range = document.getElementById("freqRange").value = freq;
}

window.onload = function() {
  if (!usingWebAudio) {
    document.getElementById("audioControls").innerHTML = "<p>Web audio required.</p>"
  }

}

function updateFreq2(newFreq2) {
  freq2 = newFreq2;
  if (osc2) {
    osc2.frequency.value = freq2;
  }
  var text = document.getElementById("freqText2").value = freq2;
  var range = document.getElementById("freqRange2").value = freq2;
}

window.onload = function() {
  if (!usingWebAudio) {
    document.getElementById("audioControls2").innerHTML = "<p>Web audio required.</p>"
  }

}
function updateFreq3(newFreq3) {
  freq3 = newFreq3;
  if (osc3) {
    osc3.frequency.value = freq3;
  }
  var text = document.getElementById("freqText3").value = freq3;
  var range = document.getElementById("freqRange3").value = freq3;
}

window.onload = function() {
  if (!usingWebAudio) {
    document.getElementById("audioControls3").innerHTML = "<p>Web audio required.</p>"
  }

}
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);



      function drawChart() {
        var scale = (50*freq);
        var step = 1;

        var data = google.visualization.arrayToDataTable([]);
          data.addColumn('string', '');
          data.addColumn('number', 'Tone 1');
          data.addColumn('number', 'Tone 2');
          data.addColumn('number', 'Tone 3');
          data.addColumn('number', 'Sum');



          data.addRow(['|',  0,  0, 0, 0]);

        var i = 1;
        while(i < 500){
            data.addRow(['|',  1.1*Math.sin(2*Math.PI*(i/scale)*freq),   1.1*Math.sin(2*Math.PI*(i/scale)*freq2),    1.1*Math.sin(2*Math.PI*(i/scale)*freq3), 1.1*Math.sin(2*Math.PI*(i/scale)*freq) + 1.1*Math.sin(2*Math.PI*(i/scale)*freq2) + 1.1*Math.sin(2*Math.PI*(i/scale)*freq3)]);
            i++;
        }


        var options = {
          title: 'Tone Waves',
          curveType: 'function',
          legend: { position: 'bottom' },
            series: {
            0: { color: '#041E42' },
            1: { color: '#807E7F' },
            2: { color: '#231F20' },
            3: { color: '#1560FB' },

          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
