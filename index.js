/******************************************************************************
  QUIZ COMPONENT
******************************************************************************/
// REQUIRE
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')
var chart = require('chart.js')

// COLORS
var yellow = "#C2B97F"
var white = "#F2F7F2"
var violet = "#8E5572"
var lightBrown = "#BCAA99"
var darkBrown = "#88665D"

// FONT
var links = ['https://fonts.googleapis.com/css?family=Inconsolata']
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)


function quizComponent () {
  var css = csjs`
  .results {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    background-color: ${white};
    text-align: center;
    font-family: 'Inconsolata', monospace;
    padding-bottom: 200px;
  }
  .resultTitle{
    font-size: 1em;
    padding: 5px;
    color: ${darkBrown}
  }
  .showChart {
    font-size: 2em;
    color: ${violet};
    margin: 35px;
  }
  .showChart:hover {
    color: ${yellow};
    cursor: pointer;
  }
  .myChart {
    width: 300px;
    height: 300px;
  }
  `
  var html = template()
  document.body.appendChild(html)

  return html

  function template () {
    return yo`
    	${seeResults()}
    `
  }


  function seeResults() {
    var ctx = yo`
    <canvas class="${css.myChart}"></canvas>
    `
    return yo`
      <div class="${css.results}">
        <div class="${css.resultTitle}">
          1. It's a waste of time to learn any other language than
          #JavaScript.The future is with JS :) <br>
          2. Framework vs. #hypermodular development is like
          planned economy vs. free market.<br>
          3. Information asymmetry can best be broken by making
          everything #transparent.<br>
          4. Programming is the new literacy, everyone should learn it.
          All other jobs will be #automated.<br>
          5. Employment is for kids. Grown ups are #self-employed.<br>
          6. With #VR all the jobs will be remote.
          On-site gatherings will be for fun.
        </div>
        <div class="${css.showChart}" onclick=${function(){createChart(ctx)}}>
        	Click to see the chart
        </div>
        ${ctx}
      </div>
    `
  }

  function createChart(ctx) {
    minixhr('https://quiz-15523.firebaseio.com/results.json', responseHandler)
    function responseHandler (data, response, xhr, header) {
      var data = JSON.parse(data)
      var keys = Object.keys(data)
      var arrayOfAnswers = keys.map(x=>data[x])
      var firstAnswer = arrayOfAnswers.shift()
      var stats = arrayOfAnswers.reduce(function(currentResult,answer,i) {
        var newResult=currentResult.map((x,count)=>(x*(i+1)+answer[count])/(i+2))
        return newResult
      }, firstAnswer)
      var data = {
        labels: [
          "1 #JavaScript", "2 #Hypermodularity", "3 #Transparency",
          "4 #Automation", "5 #Self-employment", "6 #VR"
        ],
        datasets: [
          {
            label: "Average opinion",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: stats
          }
        ]
      }
      var myChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          scale: {
            scale: [1,2,3,4,5,6],
            ticks: {
              min: 0,
              max: 6
            }
          }
        }
      })
      }
  }


}

quizComponent()
