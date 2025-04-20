import { Player } from "./players";

export class GameController{
    constructor(player1ShipPositions, player2ShipPositions){
        this.player1 = new Player();
        this.player2 = new Player();
        this.player1.playersBoard.positionsOfTheShip = player1ShipPositions;
        this.player2.playersBoard.positionsOfTheShip = player2ShipPositions;
        this.player1.playersBoard.fillShipPositionsInsideTheBoard();
        this.player2.playersBoard.fillShipPositionsInsideTheBoard();
        this.activePlayer = this.player1;
        this.enemyPlayer = this.player2;
    }

    changeActivePlayer(){
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
        this.enemyPlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    }

    playRound(x,y){
        const attackStatus = this.enemyPlayer.playersBoard.recieveAttack(x,y);

        if(attackStatus === false) return 'falseAttack'; //return false attack

        const winStatus = this.enemyPlayer.playersBoard.checkIfAllShipsHaveSunk();

        if(winStatus === true){
            let playerName;
            if(this.activePlayer === this.player1) playerName = 'Player 1';
            if(this.activePlayer === this.player2) playerName = 'Player 2';
            return `${playerName}`;
        }

        this.changeActivePlayer();

        return 'nextRound';
    }


}