import { Player } from "./players";
import { computerAttackSystem } from "./computerAttack"; 

export class GameControllerPlayingWithComputer{
    constructor(positionsOfPlayerShips , positionsOfComputerShips){
        this.playersBoard = new Player();
        this.computerBoard = new Player();

        this.computer = new computerAttackSystem();
        
        this.playersBoard.playersBoard.positionsOfTheShip = positionsOfPlayerShips;
        this.computerBoard.playersBoard.positionsOfTheShip = positionsOfComputerShips;
        this.playersBoard.playersBoard.fillShipPositionsInsideTheBoard();
        this.computerBoard.playersBoard.fillShipPositionsInsideTheBoard();
    }

    playRound(x,y){
        const attackStatus = this.computerBoard.playersBoard.recieveAttack(x,y);

        if(attackStatus === false) return "falseAttack";

        let winStatus = this.computerBoard.playersBoard.checkIfAllShipsHaveSunk();

        if(winStatus === true) return "playerWon";

        const xAndYObject = this.computer.getAttackPoint();
        const xOfComputerAttack = xAndYObject.x;
        const yOfComputerAttack = xAndYObject.y;
        this.playersBoard.playersBoard.recieveAttack(xOfComputerAttack , yOfComputerAttack);

        winStatus = this.playersBoard.playersBoard.checkIfAllShipsHaveSunk();

        if(winStatus === true) return {roundResult: "computerWon", x: xOfComputerAttack, y: yOfComputerAttack };

        if(this.playersBoard.playersBoard.board[xOfComputerAttack][yOfComputerAttack].shipName !== null){
            this.computer.opponentBoard[xOfComputerAttack][yOfComputerAttack].shipPresent = true;
        }

        return {roundResult: "nextRound", x: xOfComputerAttack, y: yOfComputerAttack };
    }
}