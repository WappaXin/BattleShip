import { Player } from "./players";

export class GameController{
    constructor(){
        this.player1 = new Player();
        this.player2 = new Player();
    }

    // add event listeners to the play button 
    // get the data from the placeShips.js about the ships position

    addEventListenersToPlayBtn(){
        const player1PlayBtn = document.getElementById("player1PlayBtn");
        const player2PlayBtn = document.getElementById("player2PlayBtn");

        player1PlayBtn.addEventListener("click" , getShipPositionsOfPlayer1);
        player2PlayBtn.addEventListener("click" , getShipPositionsOfPlayer2);
    }

}