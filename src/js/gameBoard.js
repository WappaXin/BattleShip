import { Ship } from "./ship";

export class GameBoard{
    constructor(){
        this.rows = 10;
        this.columns = 10;
        this.board = [];
        this.ships = {};
        this.fillBoard();
        this.createShips();
        this.shipNames = Object.keys(this.ships);
        this.shipInstance = Object.values(this.ships);
        this.positionsOfTheShip = {};
    }

    fillBoard(){
        for(let i = 0 ; i < 10 ; i++){
            this.board[i] = [];
            for(let j = 0 ; j < 10 ; j++){
                this.board[i][j] = {bombed: false , shipName: null};
            }
        }
    }

    createShips(){
        this.ships["Ship41"] = new Ship(4);
        this.ships["Ship31"] = new Ship(3);
        this.ships["Ship32"] = new Ship(3);
        this.ships["Ship21"] = new Ship(2);
        this.ships["Ship22"] = new Ship(2);
        this.ships["Ship23"] = new Ship(2);
        this.ships["Ship11"] = new Ship(1);
        this.ships["Ship12"] = new Ship(1);
        this.ships["Ship13"] = new Ship(1);
        this.ships["Ship14"] = new Ship(1);
    }

    recieveAttack(i,j){
        if(this.board[i][j].bombed === false){
            this.board[i][j].bombed = true;
            
            if(this.board[i][j].shipName !== null){                
                for(let a = 0 ; a < this.shipNames.length ; a++){
                    if(this.shipNames[a] === this.board[i][j].shipName){
                        this.shipInstance[a].hit();
                    }
                }
            }
            return true;
        }
        return false;
    }

    checkIfAllShipsHaveSunk(){
        for(let i = 0 ; i < this.shipInstance.length ; i++){
            if(this.shipInstance[i].sunkValidity === false) return false;
        }

        return true;
    }

    fillShipPositionsInsideTheBoard(){
        const shipNames = Object.keys(this.positionsOfTheShip);
        const shipCoOrdinates = Object.values(this.positionsOfTheShip);

        for(let i = 0 ; i < shipNames.length ; i++){
            for(let j = 0 ; j < shipCoOrdinates[i].length ; j++){
                let xValue = Number(shipCoOrdinates[i][j].x);
                let yValue = Number(shipCoOrdinates[i][j].y);
                this.board[xValue][yValue].shipName = shipNames[i];
            }
        }

    }
}