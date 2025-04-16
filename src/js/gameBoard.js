import { Ship } from "./ship";

export class GameBoard{
    constructor(){
        this.rows = 10;
        this.columns = 10;
        this.board = [];
        this.ships = [];
        this.fillBoard();
        this.createShips();
    }

    fillBoard(){
        for(let i = 0 ; i < 10 ; i++){
            this.board[i] = [];
            for(let j = 0 ; j < 10 ; j++){
                this.board[i][j] = {bombed: false , shipIndex: null};
            }
        }
    }

    createShips(){
        this.ships[0] = new Ship(4);
        this.ships[1] = new Ship(3);
        this.ships[2] = new Ship(3);
        this.ships[3] = new Ship(2);
        this.ships[4] = new Ship(2);
        this.ships[5] = new Ship(2);
        this.ships[6] = new Ship(1);
        this.ships[7] = new Ship(1);
        this.ships[8] = new Ship(1);
        this.ships[9] = new Ship(1);
    }

    recieveAttack(i,j){
        if(this.board[i][j].bombed = false){
            this.board[i][j].bombed = true;
            if(shipIndex !== null){
                // call hit function on the ship in the this.ships
            }
        }
    }

    shipCoordinates(index){
        const numberOfCo_ordinates = this.ships[index].length;
        this.ships[index].co_ordinates;

    }
}