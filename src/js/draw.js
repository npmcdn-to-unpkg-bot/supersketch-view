var waitForFinalEvent = (function() {
  var timers = {};
  return function(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

var getCanvasSize = function(windowWidth) {
    if (windowWidth <= 600) {
        return {
            width: windowWidth,
            height: windowWidth / 1.2
        }
    } else {
        return {
            width: windowWidth,
            height: windowWidth / 1.666
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var container = $('#game');

    var lineArray = [];
    var groupLines = new fabric.Group();
    var calcRatio = function (width, height) {
        // if (width > (height * 1.777777)) {
        //     return {
        //         width: height * 1.777777,
        //         height: height
        //     }
        // } else {
        //     return {
        //         width: width,
        //         height: height
        //     }
        // }
        return {
            width: width,
            height: height
        }
    }
    var newWidthHeight = getCanvasSize(container.outerWidth() - 25);
    var canvas = new fabric.Canvas('drawing', {
        width: newWidthHeight.width,
        height: newWidthHeight.height,
        isDrawingMode: true,
        selection: false
    });
    canvas.freeDrawingBrush.width = 10;
    canvas.setBackgroundColor('rgba(255, 255, 255, 1)');
    canvas.renderAll();

    function zoomResize(factorWidth, factorHeight) {
        console.log("resizing canvas and canvas objects");
        canvas.setHeight(canvas.getHeight() * factorHeight);
        canvas.setWidth(canvas.getWidth() * factorWidth);
        if (canvas.backgroundImage) {
            var backgroundImage = canvas.backgroundImage;
            backgroundImage.width = backgroundImage.width * factorWidth;
            backgroundImage.height = backgroundImage.height * factorHeight;
        }
        var objects = canvas.getObjects();
        for (var i in objects) {
            var scaleX = objects[i].scaleX;
            var scaleY = objects[i].scaleY;
            var left = objects[i].left;
            var top = objects[i].top;

            var tempScaleX = scaleX * factorWidth;
            var tempScaleY = scaleY * factorHeight;
            var tempLeft = left * factorWidth;
            var tempTop = top * factorHeight;

            objects[i].scaleX = tempScaleX;
            objects[i].scaleY = tempScaleY;
            objects[i].left = tempLeft;
            objects[i].top = tempTop;

            objects[i].setCoords();
        }
        canvas.renderAll();
        canvas.calcOffset();
    }

    // Resize canvas after resizing window
    $(window).resize(function() {
        // Wait for it...
        waitForFinalEvent(function() {
            // Do stuff here 500 ms delay afterwards
            // console.log($(window).outerWidth() + " " + $(window).outerHeight());
            console.log(container.width() + " " + container.outerWidth());
            newWidthHeight = getCanvasSize(container.outerWidth() - 25);
            var zoomFactorWidth = newWidthHeight.width / canvas.getWidth();
            var zoomFactorHeight = newWidthHeight.height / canvas.getHeight();
            zoomResize(zoomFactorWidth, zoomFactorHeight);
        }, 500, "some unique string");
    });

    // fabric.js event listeners
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

    $(document).keyup(function(e) {
        if(e.which == 13) {
            console.log("hello");
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
        if (e.which == 220) {
            console.log("hello");
            canvas.isDrawingMode = !canvas.isDrawingMode;
            canvas.renderAll();
        }
    });

    $(window).resize(function() {
        
    });
});