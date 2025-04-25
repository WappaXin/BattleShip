import { PlaceShips } from "./placeShips";
import {GameControllerPlayingWithComputer} from "./computerGameController";

export class Dom{
    constructor(){
        this.fillGrid("myGrid0");
        this.fillGrid("computerGrid");
        this.placeShipsPlayer = new PlaceShips("myGrid0");
        this.placeShipsComputer = new PlaceShips("computerGrid");
        this.placeShipsComputer.disableAllEventListenersForMyGrid();
        this.gameController = null;
        this.positionsOfPlayerShips = null;
        this.positionsOfComputerShips = null;
        this.playBtnHandlerRef = this.playBtnHandler.bind(this);
        this.addEventListenerToPlayBtn();
        this.opponentGridHandlerRef = this.oppenentGridHandler.bind(this);
    }

    fillGrid(string){
        const grid = document.querySelector(`.${string}`);
        for(let i = 0 ; i < 10 ; i++){
            for(let j = 0 ; j < 10 ; j++){
                const div = document.createElement('div');
                div.classList.add(`${string}Cell`);
                div.dataset.coOrdinate = `${j}${i}`;
                grid.appendChild(div);
            }
        }
    }

    addEventListenerToPlayBtn(){
        const playBtn = document.getElementById("myGrid0PlayBtn");

        playBtn.addEventListener("click" , this.playBtnHandlerRef );
    }

    playBtnHandler(e){
        const playBtnSuggestion = document.querySelector(".player > .details > p");
        const randomiseBtn = document.getElementById("myGrid0RandomPositionsOfShip");
        const opponentGrid = document.querySelector(".opponentGrid");
        const humanGrid = document.querySelector(".humanGrid");

        if(e.target.id === "myGrid0PlayBtn"){
            this.positionsOfPlayerShips = this.placeShipsPlayer.getPositionsOfShips();
            this.positionsOfComputerShips = this.placeShipsComputer.getPositionsOfShips();

            this.gameController = new GameControllerPlayingWithComputer(this.positionsOfPlayerShips,this.positionsOfComputerShips);
            
            this.fillGrid("opponentGrid");
            this.fillGrid("humanGrid");
            opponentGrid.style.border = "1px solid red";
            humanGrid.style.border = "1px solid red";
            
            this.placeShipsPlayer.disableAllEventListenersForMyGrid();
            e.target.remove();
            playBtnSuggestion.textContent = "";
            randomiseBtn.remove();
            
            this.addEventListenerToOpponentGrid();
        }
    }

    addEventListenerToOpponentGrid(){
        const opponentGrid = document.querySelector(".opponentGrid");
        opponentGrid.addEventListener( "click" , this.opponentGridHandlerRef )
    }

    removeEventListenerToOpponentGrid(){
        const opponentGrid = document.querySelector(".opponentGrid");
        opponentGrid.removeEventListener( "click" , this.opponentGridHandlerRef )
    }

    async oppenentGridHandler(e){
        if(e.target.classList.contains("opponentGridCell")){
            const xAndYArray = e.target.dataset.coOrdinate.split('');
            const x = Number(xAndYArray[0]);
            const y = Number(xAndYArray[1]);

            const roundStatus = this.gameController.playRound(x,y);

            if(roundStatus === "falseAttack") return;
            if(roundStatus === "playerWon"){
                this.changeColorOfCellWhilePlayerBombs(x,y);
                this.displayWinner("won");
                this.removeEventListenerToOpponentGrid();
                this.createPlayAgainBtn();
                this.removeBlockScreen();
                return;
            }
            if(roundStatus.roundResult === "computerWon"){
                this.changeColorOfCellWhilePlayerBombs(x,y);
                this.changeColorOfCellWhileComputerBombs(roundStatus.x,roundStatus.y)
                this.displayWinner("lost");
                this.removeEventListenerToOpponentGrid();
                this.createPlayAgainBtn();
                this.removeBlockScreen();
                return;
            }
            if(roundStatus.roundResult === "nextRound"){
                this.changeColorOfCellWhilePlayerBombs(x,y);
                this.changeColorOfCellWhileComputerBombs(roundStatus.x,roundStatus.y);
                this.removeEventListenerToOpponentGrid();
                await new Promise(resolve => setTimeout(resolve, 500));
                this.addEventListenerToOpponentGrid();
                return;
            }
        }
    }

    displayWinner(gameStatus){
        const displayGamestatusForPlayerDiv = document.querySelector(".gameStatusForPlayer");
        displayGamestatusForPlayerDiv.style.fontSize = "3rem";
        if(gameStatus === "won"){
            displayGamestatusForPlayerDiv.textContent = "You Won!!";
        }else if(gameStatus === "lost"){
            displayGamestatusForPlayerDiv.textContent = "You Lost!";
        }
    }

    changeColorOfCellWhilePlayerBombs(x,y){
        const opponentGridCell = document.querySelector(`.opponentGridCell[data-co-ordinate="${x}${y}"]`);
        const computerGridCell = document.querySelector(`.computerGridCell[data-co-ordinate="${x}${y}"]`);
        
        if(this.gameController.computerBoard.playersBoard.board[x][y].shipName !== null){
            opponentGridCell.style.backgroundColor = "rgba(254, 0, 34, 0.38)";
            computerGridCell.style.backgroundColor = "rgba(0, 230, 255, 0.38)";
            computerGridCell.style.zIndex = "1";
            return;
        }

        opponentGridCell.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
        computerGridCell.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
    }

    changeColorOfCellWhileComputerBombs(x,y){
        const humanGridCell = document.querySelector(`.humanGridCell[data-co-ordinate="${x}${y}"]`);
        const myGrid0Cell = document.querySelector(`.myGrid0Cell[data-co-ordinate="${x}${y}"]`);
        
        if(this.gameController.playersBoard.playersBoard.board[x][y].shipName !== null){
            humanGridCell.style.backgroundColor = "rgba(254, 0, 34, 0.38)";
            myGrid0Cell.style.backgroundColor = "rgba(0, 230, 255, 0.38)";
            myGrid0Cell.style.zIndex = "10";
            return;
        }

        humanGridCell.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
        myGrid0Cell.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
    }

    createPlayAgainBtn(){
        const playComputerPageLink = document.createElement("a");
        const playerDetailsDiv = document.querySelector(".player > .details");
        
        playComputerPageLink.href = "./../playComputer.html";
        playComputerPageLink.textContent = "Play Again";
        playerDetailsDiv.appendChild(playComputerPageLink);
    }

    removeBlockScreen(){
        const blockScreenForComputer = document.getElementById("computerPlayAreaScreenBlock");

        blockScreenForComputer.remove();
    }
}