##Data Visualization


###general usage
in a HTML Website

```html

<html>
<body>
<canvas id="myCanvas" width="600" height="215">Your browser does not support the HTML5 canvas tag.</canvas>
<script src="linechart.js"></script>
<script>
    var lineChart = new LineChart();
    //place to adjust properties
    lineChart.drawLineChart(0,0,document.getElementById("myCanvas").getContext("2d"));
</script>
</body>
</html>

```


or in qml

```qml

import QtQuick 2.0
import "linechart.js" as LineChart

Rectangle {
    width: 600
    height: 600

    Canvas {
        id: canvas
        anchors.fill: parent

        onPaint: {
            var line_chart = new LineChart.LineChart();
            //place to adjust properties
            line_chart.drawLineChart(0, 0, getContext("2d"));
        }

    }
}

```

###auto scale

There are several problems when it comes to display very vary values. The auto scale function adjust the matrix height and scale to the maximum value of the input data. Additionally the scale numbers could be rounded because if they get small by value they will be too large to display.

You should always consider that if you have high values combined with really lower values it will be hard to see the difference between the low values.


---
###linechart.js

drawFunction: 

>drawLineChart(x, y, context)

necessary properties:

>x - x position in the canvas

>y - y position in the canvas

>context - 2d canvas context to draw into



####changeable properties:

#####general properties

attribute | description | default value
--- | --- | ---
width | total width of the chart | 600
height | total height of the chart | 200

#####axis text properties

attribute | description | default value
--- | --- | ---
text_size | axis description text size | "15px"
text_color | axis description text color | "rgba(0, 0, 255, 1)"
text_x | x axis description text | "Pings"
text_y | y axis description text | "Time (ms)"

#####matrix properties

attribute | description | default value
--- | --- | ---
matrix_linePaddingLeft | gap between line entity and matrix line | 0.1
matrix_lineColor | color of the matrix line | "rgba(0, 0, 0, 1)"
matrix_scale_size | distance steps between matrix lines | 30
matrix_scale_steps | value steps between matrix lines | 40
matrix_scale_round_digits | number of digits to round the steps values to (important for auto scale) | 2
matrix_auto_scale | automatically scales the matrix to the maximum of the input data (overwrites matrix_scale_size and matrix_scale_steps) | true
matrix_auto_scale_number_of_lines | number of lines to use for auto scale | 5
matrix_textPaddingLeft | gap between line entity and left border | 0.5
matrix_textColor | entity text color | "black"
matrix_textSize | entity text size | "10px"
matrix_lineWidth | matrix line size | 0.3

#####line graph properties

attribute | description | default value
--- | --- | ---
graph_linePaddingLeft | gap between graph and left border | 0.1 
graph_fillBottomArea | fill area under the graph line | true 
graph_showPoints | show black measure points on top of graph line | true 
graph_pointDelta | gap between measure points | 20 
graph_auto_scale_pointDelta | automatically scales the graph width to the width of the matrix (overwrites graph_pointDelta) | true
graph_auto_scale_pointDelta_paddingRight | gap between rightist point and right end of the matrix | 5
graph_lineWidth | graph line size | 2 
graph_colorPairs | graph color pairs - line color - fill color | [ [ "rgba(0, 0, 255, 1)", "rgba(0, 0, 255, 0.2)" ],... ]

####input data:

attribute: pointJSON 

format for one line graph: 

[
>[
>>[30],

>>[60],

>>[80],

>>[70],

>>[60],

>],

>...

]



---
###barchart.js

drawFunction: 

>drawBarChart(x, y, context)

necessary properties:

>x - x position in the canvas

>y - y position in the canvas

>context - 2d canvas context to draw into


####changeable properties:

#####general properties

attribute | description | default value
--- | --- | ---
width | total width of the chart | 600
height | total height of the chart | 200

#####axis text properties

attribute | description | default value
--- | --- | ---
text_size | axis description text size | "15px"
text_color | axis description text color | "rgba(0, 0, 255, 1)"
text_x | x axis description text | "Pings"
text_y | y axis description text | "Time (ms)"

#####matrix properties

attribute | description | default value
--- | --- | ---
matrix_linePaddingLeft | gap between line entity and matrix line | 0.1
matrix_lineColor | color of the matrix line | "rgba(0, 0, 0, 1)"
matrix_scale_size | distance steps between matrix lines | 30
matrix_scale_steps | value steps between matrix lines | 40
matrix_scale_round_digits | number of digits to round the steps values to (important for auto scale) | 2
matrix_auto_scale | automatically scale the matrix to the maximum of the input data | true
matrix_auto_scale_number_of_lines | number of lines to use for auto scale | 5
matrix_textPaddingLeft | gap between line entity and left border | 0.5
matrix_textColor | entity text color | "black"
matrix_textSize | entity text size | "10px"
matrix_lineWidth | matrix line size | 0.3

#####bar graph properties

attribute | description | default value
--- | --- | ---
graph_barStartPaddingLeft | gap between bar and left border | 0.05
graph_lineWidth | bar border line width | 2
graph_barDelta | gap between bars | 20
graph_barWidth | bar width | 20
graph_colorPairs | graph color pairs - line color - fill color | [ [ "rgba(0, 0, 255, 1)", "rgba(0, 0, 255, 0.2)" ],... ]

####input data:

attribute: valueJSON 

format for one bar graph: 

[
>[30],
>...

]





















