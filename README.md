# BattleShip

glitches to look out for

whenever there is a glitch, the ship is left whereever it is
i.e no mouseup event is recorded, so no mouseup handler, so 
no removal of mousemove event listener
we have to adjust the selected child on the grid somehow and
also remove the mousemove event listener
think of a way to remove this mousemove handler