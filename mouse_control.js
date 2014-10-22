var startX = 0;
var startY = 0;
var offsetX = 0;
var offsetY = 0;
var dragElement = null;
var oldZIndex = 0;

var shift = 0;

var movingDistanceX = 0;
var movingDistanceY = 0;

var distanceX = 0;
var distanceY = 0;

var movingGridX = 0;
var movingGridY = 0;

var gridX = 0;
var gridY = 0;

var prevX = 0;
var prevY = 0;

var prevLeft = 0;
var prevTop = 0;

document.onmousedown = onMouseDown;
document.onmouseup = onMouseUp;

document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

function extractNumber(value)
{
  var n = parseInt(value);
  
  if (n == null || isNaN(n))
    return 0;
  else
    return n;
}

function getPosition(element)
{
  var xPosition = 0;
  var yPosition = 0;
  
  while(element)
  {
    if (mainGui.positionLocked)
    {
      xPosition += (element.offsetLeft + element.clientLeft);
      yPosition += (element.offsetTop + element.clientTop);
    }
    else
    {
      xPosition += (element.offsetLeft - element.scrollLeft + window.pageXOffset + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + window.pageYOffset + element.clientTop);
    }
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
}

function onKeyDown(e)
{
  if (e.key == "Shift")
    shift = 1;
}

function onKeyUp(e)
{
  if (e.key == "Shift")
    shift = 0;
}

function onMouseDown(e)
{
  if (e.target != null)
    var target = e.target;
  else
    var target = e.srcElement;
  
  if (e.button == 0)
  {
    if (target.id == "field" || target.parentNode.parentNode.parentNode.id == "field")
    {
      //console.log("Mouse down on field!");
      if (target.id == "field")
        dragElement = target;
      else if (target.parentNode.parentNode.parentNode.id == "field")
        dragElement = target.parentNode.parentNode.parentNode;

      var str = dragElement.style.backgroundPosition;
      var arr = str.split(" ");

      prevX = arr[0].substring(0, arr[0].indexOf("px"));
      prevY = arr[1].substring(0, arr[1].indexOf("px"));
      
      if (shift == 0)
      {
        startX = e.clientX;
        startY = e.clientY;
        
        offsetX = extractNumber(target.style.left);
        offsetY = extractNumber(target.style.top);
        
        //document.getElementById("debug").innerHTML = "startX: " + startX + "<br>startY: " + startY + "<br>offsetX: " + offsetX + "<br>offsetY: " + offsetY + "<br>X: " + e.clientX + "<br>Y: " + e.clientY;
        
        document.onmousemove = onMouseMove;
        
        document.body.focus();
        
        return false;
      }
//      else if (shift == 1)
//      {
//        dragElement.style.top = null;
//        dragElement.style.left = null;
//
//        return false;
//      }
    }
  }
}

function onMouseMove(e)
{
  if (e == null)
    e = window.event;
      
  //document.getElementById("debug").innerHTML = "startX: " + startX + "<br>startY: " + startY + "<br>offsetX: " + offsetX + "<br>offsetY: " + offsetY + "<br>X: " + e.clientX + "<br>Y: " + e.clientY;
  
  if (dragElement != null)
  {
    //dragElement.style.backgroundPosition = (e.clientX - startX) + "px " + (e.clientY - startY) + "px";
    dragElement.style.backgroundPosition = (e.clientX - startX) + "px 0";
    var centerElement = document.getElementById("focus_point");
    var newLeft = (e.clientX - startX);
    var newTop = (e.clientY - startY);

    movingDistanceX = (e.clientX - startX);
    //movingDistanceY = (e.clientY - startY);

    movingGridX = gridX + Math.round(movingDistanceX / 50);
    //movingGridY = gridY + Math.round(movingDistanceY / 50);

    debug.innerHTML = "X: " + movingGridX + " Y: " + movingGridY + "<br>X: " + gridX + " Y: " + gridY;

    newLeft = newLeft % 50;
    //newTop = newTop % 50;

    //if (newLeft == 0 || newTop == 0)
      updateTiles();

    //debug.innerHTML = "[prevLeft: " + prevLeft + ", newLeft: " + newLeft + "] X: " + gridPositionX + " Y: " + gridPositionY;

    centerElement.style.left = newLeft + "px";
    //centerElement.style.top = newTop + "px";

    prevLeft = newLeft;
    //prevTop = newTop;
  }
  //else if (activeTooltip != null)
  //{
  //  activeTooltip.style.left = (e.clientX + 10) + "px";
  //  activeTooltip.style.top = (e.clientY) + "px";
  //}
}

function onMouseUp(e)
{
  if (e.button == 0 && dragElement != null)
  {
    var str = dragElement.style.backgroundPosition;
    var arr = str.split(" ");

    var x = arr[0].substring(0, arr[0].indexOf("px"));
    var y = arr[1].substring(0, arr[1].indexOf("px"));

    distanceX = parseInt(prevX) + parseInt(x);
    distanceY = parseInt(prevY) + parseInt(y);

    gridX += Math.round(movingDistanceX / 50);
    gridY += Math.round(movingDistanceY / 50);

    var modX = x % 50;
    var modY = y % 50;

    var newX = x - modX;
    var newY = y - modY;

    debug.innerHTML = "X: " + movingGridX + " Y: " + movingGridY + "<br>X: " + gridX + " Y: " + gridY;

    dragElement.style.backgroundPosition = newX + "px " + newY + "px";

    var centerElement = document.getElementById("focus_point");
    centerElement.style.top = "0px";
    centerElement.style.left = "0px";

    dragElement = null;
    document.onmousemove = null;
  }
}