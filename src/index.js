import "./index.css";
import "./css/gameboard.css";
import "./css/ship.css";
import { PlaceShips } from "./js/placeShips";

function fillGrid(string){
    const grid = document.querySelector(`.${string}`);
    for(let i = 0 ; i < 10 ; i++){
        for(let j = 0 ; j < 10 ; j++){
            const div = document.createElement('div');
            div.classList.add(`${string}Cell`);
            div.dataset.coOrdinate = `${i}${j}`;
            grid.appendChild(div);
        }
    }
}

fillGrid("myGrid1");
fillGrid("myGrid2");

const player1PlaceShips = new PlaceShips('myGrid1');
const player2PlaceShips = new PlaceShips('myGrid2');
