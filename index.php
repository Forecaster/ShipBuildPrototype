<?php

?>

<link rel="stylesheet" type="text/css" href="styles.css"/>

<script language="JavaScript" src="mouse_control.js"></script>
<script language="JavaScript" src="functions.js"></script>
<script language="JavaScript" src="Sprintf.js"></script>

<div id="debug" style="position: fixed; top: 5px; left: 5px;"></div>

<div id="debug2" style="position: fixed; top: 5px; right: 5px;"></div>

<div id="inbox" style="position: fixed; top: 25px; left: 5px;">
</div>

<HTML>
<div class="main">
  <div id="field" class="field" style="background-position: 0 0">
    <div id="field_center" style="position: absolute; top: 250px; left: 250px;">
      <div id="focus_point" class="focus_point" style="background-color: red; top: 0; left: 0;"></div>
      <div id="center_point" class="focus_point" style="background-color: blue; top: 0; left: 0;"></div>
    </div>
    <div style="width: 16px; height: 24px; background-image: url('images/pointer.png'); position: absolute; left: 250px; top: 0px; margin-left: -8px;"></div>
  </div>
  <!--<div class="block_menu">

  </div>-->
</div>
</HTML>

<script language="JavaScript">
  var debug = document.getElementById("debug");
  var debug2 = document.getElementById("debug2");
  //global vars
  var tilesGenerated = false;
  var gridPositionX = 0;
  var gridPositionY = 0;
  var message_counter = 0;

  var currentShipId = 0;

  var myShip =
  {
    block1: {x: -1, y: -1, tile: "generator"},
    block2: {x: 1, y: -1, tile: "cargo"},
    block3: {x: 1, y: 1, tile: "turret"}
  };

  var ships = [];
  ships.push(myShip);

  updateTiles();
  debug.innerHTML = getBlockOfShip(0, -1, -1);

</script>