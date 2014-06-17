function BarChart() {
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
    this.matrix_textPaddingLeft = 0.5;
    this.matrix_textColor = "black";
    this.matrix_textSize = "10px";
    this.matrix_lineWidth = 0.3;

//    bar values
    this.graph_barStartPaddingLeft = 0.05;
    this.graph_lineWidth = 2;
    this.graph_barDelta = 20; //evtl mit daten
    this.graph_barWidth = 20; //evtl mit daten

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
    this.valueJSON = [
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
    ];

//    main chart draw function
    this.drawBarChart = function (x_kor, y_kor, context) {
        this.ctx = context;
        this.x = x_kor;
        this.y = y_kor;

        this.drawMatrix();

        var graph_barStartLeft = this.x + this.width * this.graph_barStartPaddingLeft;
        for (var i = 0; i < this.valueJSON.length; i++) {
            var colorPair = this.graph_colorPairs[i % this.graph_colorPairs.length];
            var graph_barStartLeft = graph_barStartLeft + this.graph_barDelta + this.graph_barWidth;
            this.drawBar(this.valueJSON[i], graph_barStartLeft, colorPair[0], colorPair[1]);
        }

        this.drawTextHorizontal(this.x + this.width / 2, this.y + this.height, this.text_x, this.text_color, this.text_size);
        this.drawTextVertical(this.text_y, this.text_color, this.text_size);
    }

//    draw background grid
    this.drawMatrix = function () {
        var matrix_height = this.height * 0.9;
        var matrix_width = this.width;
        var lineNumber = 0;
        for (var i = matrix_height + this.y; i > 0 + this.y; i = i - this.matrix_scale_size) {
            this.drawLine(this.x + matrix_width * this.matrix_linePaddingLeft, i, this.x + matrix_width, i, this.matrix_lineWidth, this.matrix_lineColor);
            this.drawTextHorizontal(this.x + matrix_width * this.matrix_linePaddingLeft * this.matrix_textPaddingLeft, i, lineNumber, this.matrix_textColor, this.matrix_textSize);
            lineNumber = lineNumber + this.matrix_scale_size;
        }
    }

    this.drawBar = function (valueJSON, barXPosition, lineColor, fillColor) {
        var graph_heigth = this.y + this.height * 0.9;
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = this.graph_lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(barXPosition, graph_heigth);
        this.ctx.lineTo(barXPosition, valueJSON);
        this.ctx.lineTo(barXPosition + this.graph_barWidth, valueJSON);
        this.ctx.lineTo(barXPosition + this.graph_barWidth, graph_heigth);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
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
