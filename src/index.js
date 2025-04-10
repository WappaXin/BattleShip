import "./index.css";
import "./css/gameboard.css";
import "./css/ship.css";

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

function fillShipsInMyGrid(string){
    const myGrid = document.querySelector(`.${string}`);
    const ships = ['Ship41', 'Ship31', 'Ship32', 'Ship21', 'Ship22', 'Ship23', 'Ship11', 'Ship12', 'Ship13', 'Ship14' ];

    for(let i = 0 ; i < ships.length ; i++){
        const div = document.createElement("div");
        div.classList.add(`${string}${ships[i]}`);
        myGrid.appendChild(div);
        div.draggable = true;
        div.ondragstart = "dragStartHandler(e)";
    }
}

fillGrid("myGrid1");
fillGrid("opponentGrid1");

fillGrid("myGrid2");
fillGrid("opponentGrid2");

fillShipsInMyGrid("myGrid1");
fillShipsInMyGrid("myGrid2");

const myGrid1 = document.querySelector(".myGrid1");
const myGrid2 = document.querySelector(".myGrid2");

myGrid1.setAttribute("ondrop" , "dropHandler(e)");
myGrid1.setAttribute("ondragover" , "dragoverHandler(e)");

myGrid2.setAttribute("ondrop" , "dropHandler(e)");
myGrid2.setAttribute("ondragover" , "dragoverHandler(e)");

function dragStartHandler(e){

}

function dropHandler(e){

}

function dragoverHandler(e){
    
}