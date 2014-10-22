function newMessage(message, duration)
{
  if (!duration)
    duration = 1000;

  message_counter++;
  var msg_template = sprintf("<div id='message_%s' class='message' style='opacity: 1; height: 22px;'>%s</div>", message_counter, message);
  var inbox = document.getElementById("inbox");

  inbox.innerHTML += msg_template;
  setTimeout(hideMessage, duration, message_counter);
}

function hideMessage(id)
{
  var msg = document.getElementById("message_" + id);

  msg.style.opacity = 0;
  msg.style.height = '0';
}

function updateTiles(x, y)
{
  if (x == null)
  {
    if (movingGridX != gridX)
      x = movingGridX;
    else
      x = gridX;
  }
  if (y == null)
  {
    if (movingGridY != gridY)
      y = movingGridY;
    else
      y = gridY;
  }

  var startingPosX = -6;
  var startingPosY = -6;

  //var center_point = document.getElementById("center_point");

  //center_point.style.left = ((startingPosX + 6 + x) * 50);
  //center_point.style.top = ((startingPosY + 6 + y) * 50);

  var counter = 0;
  var finalStr = "";
  var str;

  var horizontal = -300;
  var vertical = -300;

//  if (!tilesGenerated)
//  {
    while (vertical != 300)
    {
      if (startingPosX == 0)
        startingPosX = 1;
      if (startingPosY == 0)
        startingPosY = 1;

      str = "<div id=\"tile_%s\" class=\"tile\" style=\"top: %s; left: %s; background-image: %s\"></div>";

      debug2.innerHTML = "x: " + x + ", y: " + y;

      if (horizontal != 300)
      {
        counter++;
        var tile_image = getBlockOfShip(currentShipId, startingPosX, startingPosY, x, y);
        if (tile_image != undefined && tile_image != false)
          tile_image = "url('images/" + tile_image + ".png')";
        else
          tile_image = "none";

        if (tile_image != "none")
          finalStr += sprintf(str, counter, vertical, horizontal, tile_image);

        horizontal += 50;
        startingPosX++;
      }
      else
      {
        horizontal = -300;
        vertical += 50;
        startingPosX = -6;
        startingPosY++;
      }
    }

//    tilesGenerated = true;
    document.getElementById("focus_point").innerHTML = finalStr;
//  }
//  else
//  {
//    while (vertical != 300)
//    {
//      if (startingPosX == 0)
//        startingPosX = 1;
//      if (startingPosY == 0)
//        startingPosY = 1;
//
//      if (horizontal != 300)
//      {
//        counter++;
//        var tile = document.getElementById("tile_" + counter);
//        if (!tile)
//          throw new Error("Tile was null for id \"tile_" + counter + "\"");
//
//        var tile_image = getBlockOfShip(currentShipId, startingPosX, startingPosY);
//        if (tile_image != undefined && tile_image != false)
//          tile_image = "url('images/" + tile_image + ".png')";
//        else
//          tile_image = "none";
//        tile.style.top = vertical;
//        tile.style.left = horizontal;
//        tile.style.backgroundImage = tile_image;
//        horizontal += 50;
//        startingPosX++;
//      }
//      else
//      {
//        horizontal = -300;
//        vertical += 50;
//        startingPosX = -6;
//        startingPosY++;
//      }
//    }
//  }
}

function getBlockOfShip(id, x, y, adjustX, adjustY)
{
  //console.log("Query for id: " + id + ", x: " + x + ", y: " + y);
  if (id == null)
    return false;
  if (x == null)
    return false;
  if (y == null)
    return false;
  if (adjustX == null)
    adjustX = 0;
  if (adjustY == null)
    adjustY = 0;
  ship = ships[id];

  for (var key in ship)
  {
    var shipX = (ship[key].x + adjustX);
    var shipY = (ship[key].y + adjustY);
    var shipTile = ship[key].tile;

    if (shipX == 0)
      shipX += 1;
    if (shipY == 0)
      shipY += 1;

    //if (shipTile == "generator")
      //console.log("Testing x:" + (shipX + adjustX) + " against " + x + " and y:" + (shipY + adjustY) + " against " + y);
    if (shipX == x && shipY == y)
    {
      //console.log("Returning " + shipTile);
      return shipTile;
    }
  }
}