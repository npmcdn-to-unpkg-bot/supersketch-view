document.addEventListener("DOMContentLoaded", function () {
    var container = $('#game');

    var lineArray = [];
    var groupLines = new fabric.Group();
    var calcRatio = function (width, height) {
        if (width > height) {
            return {
                width: height * 1.33333,
                height: height
            }
        } else {
            return {
                width: width,
                height: width / 1.33333
            }
        }
    }
    var newWidthHeight = calcRatio(container.width(), container.height());

    var canvas = new fabric.Canvas('drawing', {
        width: container.width(),
        height: container.height(),
        isDrawingMode: true,
        selection: false
    });
    canvas.freeDrawingBrush.width = 10;
    canvas.setBackgroundColor('rgba(255, 255, 255, 1)');
    canvas.renderAll();

    canvas.on('path:created', function(line) {
        (line.path).clone(function(copy) {
            lineArray.push(copy);
            groupLines.addWithUpdate(copy);
        });
        canvas.forEachObject(function(o) {
            canvas.remove(o);
        });
        canvas.clear();
        canvas.add(groupLines);
        // canvas.setActiveObject(groupLines);
        canvas.renderAll();
    });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            canvas.isDrawingMode = !canvas.isDrawingMode;
            if (!canvas.isDrawingMode) {
                console.log(groupLines);
                groupLines.scaleX = 2;
                groupLines.scaleY = 2;
                canvas.renderAll();
            } else {
                groupLines.scaleX = 1;
                groupLines.scaleY = 1;
                canvas.renderAll();
            }
        }
    });
});