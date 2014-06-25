function LineChart() {
//    necessary attributes
    this.ctx = undefined;
    this.x = undefined;
    this.y = undefined;

//    default values
//    total size
    this.width = 600;
    this.height = 200;

//    horziontal and vertical axial annotation
    this.text_size = "15px";
    this.text_color = "rgba(0, 0, 255, 1)";
    this.text_x = "Pings";
    this.text_y = "Time (ms)";

//    grid values
    this.matrix_linePaddingLeft = 0.1;
    this.matrix_lineColor = "rgba(0, 0, 0, 1)";
    this.matrix_scale_size = 30;
    this.matrix_scale_steps = 40;
    this.matrix_scale_round_digits = 2;
    this.matrix_auto_scale = true;
    this.matrix_auto_scale_number_of_lines = 5;
    this.matrix_textPaddingLeft = 0.5;
    this.matrix_textColor = "black";
    this.matrix_textSize = "10px";
    this.matrix_lineWidth = 0.3;

//    graph values
    this.graph_linePaddingLeft = 0.1;
    this.graph_fillBottomArea = true;
    this.graph_showPoints = true;
    this.graph_pointDelta = 20;
    this.graph_lineWidth = 2;

//    test data
//    test color array
    this.graph_colorPairs = [
        ["rgba(0, 0, 255, 1)", "rgba(0, 0, 255, 0.2)"],
        ["rgba(255, 0, 0, 1)", "rgba(255, 0, 0, 0.2)"],
        ["rgba(0, 255, 0, 1)", "rgba(0, 255, 0, 0.2)"],
        ["rgba(128, 0, 0, 1)", "rgba(128, 0, 0, 0.2)"],
        ["rgba(128, 128, 128, 1)", "rgba(128, 128, 128, 0.2)"],
    ];

//    test inputdata array
    this.pointJSON = [
        [
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [20],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [20],
            [20],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [20],
            [20],
            [20],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [20],
            [20],
            [20],
            [20],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ],
        [
            [10],
            [20],
            [20],
            [20],
            [20],
            [20],
            [30],
            [60],
            [80],
            [70],
            [60],
            [80],
            [30],
            [60],
            [80],
            [120],
            [110],
            [80],
        ]
    ];

//    main chart draw function
    this.drawLineChart = function (x_kor, y_kor, context) {
        this.ctx = context;
        this.x = x_kor;
        this.y = y_kor;

        this.drawMatrix();


        for (var i = 0; i < this.pointJSON.length; i++) {
            var colorPair = this.graph_colorPairs[i % this.graph_colorPairs.length];
            this.drawLineGraph(colorPair[0], this.pointJSON[i], colorPair[1]);
        }

        this.drawTextHorizontal(this.x + this.width / 2, this.y + this.height, this.text_x, this.text_color, this.text_size);
        this.drawTextVertical(this.text_y, this.text_color, this.text_size);
    }

// calculates the value to the shown pixel
    this.matrixScaleTranslation = function (value) {
        return (value/this.matrix_scale_steps)*this.matrix_scale_size;
    }

// automatically scalles the matrix by the max value
    this.matrixAutoScale = function () {
        var max = 0;
        for (var i = 0; i < this.pointJSON.length; i++) {
            for(var n = 0; n < this.pointJSON[i].length; n++) {
                if (max < this.pointJSON[i][n][0]) {
                    max = this.pointJSON[i][n][0];
                }
            }
        };
        this.matrix_scale_size = this.height*0.8/this.matrix_auto_scale_number_of_lines;
        this.matrix_scale_steps = max/this.matrix_auto_scale_number_of_lines;
    }

// rounds number to n digits
    this.roundNumber = function (number,n){
        var factor;
        factor = Math.pow(10,n);
        return (Math.round(number * factor) / factor);
    }

//    draw background grid
    this.drawMatrix = function () {
        var matrix_height = this.height * 0.9;
        var matrix_width = this.width;
        var lineNumber = 0;
        if (this.matrix_auto_scale) {
            this.matrixAutoScale();
        }
        for (var i = matrix_height + this.y; i > 0 + this.y; i = i - this.matrix_scale_size) {
            this.drawLine(this.x + matrix_width * this.matrix_linePaddingLeft, i, this.x + matrix_width, i, this.matrix_lineWidth, this.matrix_lineColor);
            this.drawTextHorizontal(this.x + matrix_width * this.matrix_linePaddingLeft * this.matrix_textPaddingLeft, i, this.roundNumber(lineNumber, this.matrix_scale_round_digits), this.matrix_textColor, this.matrix_textSize);
            lineNumber = lineNumber + this.matrix_scale_steps;
        }
    }

//    draw whole graph
    this.drawLineGraph = function (lineColor, pointJSON, fillColor) {
        var graph_heigth = this.y + this.height * 0.9;
        var graph_lineStartLeft = this.x + this.width * this.graph_linePaddingLeft;
        this.drawLineGraphLines(graph_heigth, graph_lineStartLeft, lineColor, pointJSON, fillColor);
        if (this.graph_showPoints) {
            this.drawLineGraphRectangles(graph_heigth, graph_lineStartLeft, pointJSON);
        }
    }

//    draw graph lines
    this.drawLineGraphLines = function (graph_heigth, pointOffset, color, pointJSON, fillColor) {
        var startPointOffset = pointOffset;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = this.graph_lineWidth;
        this.ctx.moveTo(pointOffset, graph_heigth - this.matrixScaleTranslation(pointJSON[0][0]));

        for (var i = 0; i < pointJSON.length; i++) {
            if (i < pointJSON.length - 1) {
                this.drawContinuesLine(pointOffset + this.graph_pointDelta, graph_heigth - this.matrixScaleTranslation(pointJSON[i + 1][0]));
            }
            pointOffset = pointOffset + this.graph_pointDelta;
        }
        this.ctx.stroke();

        if (this.graph_fillBottomArea) {
            this.drawContinuesLine(pointOffset - this.graph_pointDelta, graph_heigth);
            this.drawContinuesLine(startPointOffset, graph_heigth);
            this.drawContinuesLine(startPointOffset, graph_heigth - this.matrixScaleTranslation(pointJSON[0][0]));
            this.ctx.closePath();
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
    }

//    draw rectangles on lines
    this.drawLineGraphRectangles = function (graph_heigth, pointOffset, pointJSON) {
        for (var i = 0; i < pointJSON.length; i++) {
            this.drawRectangle(pointOffset, graph_heigth - this.matrixScaleTranslation(pointJSON[i][0]), 5, 5, 2, "black", "black");
            pointOffset = pointOffset + this.graph_pointDelta;
        }
    }

//    draw single line
    this.drawLine = function (line_start_x, line_start_y, line_end_x, line_end_y, line_width, line_color) {
        this.ctx.strokeStyle = line_color;
        this.ctx.lineWidth = line_width;
        this.ctx.beginPath();
        this.ctx.moveTo(line_start_x, line_start_y);
        this.ctx.lineTo(line_end_x, line_end_y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

//    draw subsequently line
    this.drawContinuesLine = function (continuesLine_end_x, continuesLine_end_y) {
        this.ctx.lineTo(continuesLine_end_x, continuesLine_end_y);
    }

    this.drawRectangle = function (rectangle_pos_x, rectangle_pos_y, rectangle_x, rectangle_y, rectangle_lineWidth, rectangle_boarder_color, rectangle_fill_color) {
        this.ctx.lineWidth = rectangle_lineWidth;
        this.ctx.fillStyle = rectangle_boarder_color;
        this.ctx.fillRect(rectangle_pos_x - (rectangle_x / 2), rectangle_pos_y - (rectangle_y / 2), rectangle_x, rectangle_y);
    }

    this.drawTextHorizontal = function (textHorizontal_pos_x, textHorizontal_pos_y, textHorizontal_text, textHorizontal_color, textHorizontal_size) {
        var text_width = this.ctx.measureText(textHorizontal_text);
        this.ctx.font = textHorizontal_size + ' Ubuntu';
        this.ctx.fillStyle = textHorizontal_color;
        this.ctx.fillText(textHorizontal_text, textHorizontal_pos_x - text_width.width / 2, textHorizontal_pos_y);
    }

    this.drawTextVertical = function (textVertical_text, textVertical_color, textVertical_size) {
        var text_width = this.ctx.measureText(textVertical_text);
        this.ctx.font = textVertical_size + ' Ubuntu';
        this.ctx.fillStyle = textVertical_color;
        this.ctx.rotate((-Math.PI / 2));
        this.ctx.fillText(textVertical_text, -(this.y + this.height / 2 + text_width.width / 2), this.x + 15);
    }
}
