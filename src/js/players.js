import { GameBoard } from "./gameBoard";

export class Player{
    constructor(playerType){
        this.playerType = playerType;
        this.playersBoard = new GameBoard(); 
    }

}