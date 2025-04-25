import {GameController} from "./gameController";
import { PlaceShips } from "./../placeShips";

export class Dom{
    constructor(){
        this.fillGrid("myGrid1");
        this.fillGrid("myGrid2");
        this.placeShips1 = new PlaceShips("myGrid1");
        this.placeShips2 = new PlaceShips("myGrid2");
        this.addEventListenerToPlayBtn();
        this.positionOfShips1 = null;
        this.positionOfShips2 = null;
        this.player1Ready = false;
        this.player2Ready = false;
        this.gameController = null;
        this.player1Handler = this.playRoundByPlayer1.bind(this);
        this.player2Handler = this.playRoundByPlayer2.bind(this);
        this.screenBlockHandlerRef = this.screenBlockHandler.bind(this);
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

    enableScreenBlockForWholeScreen(){
        const screenBlock = document.getElementById("blockWholeScreen");

        screenBlock.style.position = "absolute";
        screenBlock.style.top = "0";
        screenBlock.style.left = "0";
        screenBlock.style.height = "100vh";
        screenBlock.style.width = "100vw";
        screenBlock.style.backgroundColor = "white";
        screenBlock.style.zIndex = "30";
        screenBlock.style.duration = "1s";
        screenBlock.textContent = "Press Enter if it's your turn";
        screenBlock.style.textAlign = "center";
        screenBlock.style.padding = "45vh";
        screenBlock.style.fontSize = "4rem";

        document.addEventListener("keydown" , this.screenBlockHandlerRef )
    }

    screenBlockHandler(e){
        if(e.code === "Enter"){
            this.disableScreenBlockForWholeScreen();
        }
    }

    disableScreenBlockForWholeScreen(){
        const screenBlock = document.getElementById("blockWholeScreen");

        screenBlock.style.height = "0px";
        screenBlock.style.width = "0px";
        screenBlock.style.backgroundColor = "transparent";
        screenBlock.style.zIndex = "0";
        screenBlock.textContent = "";

        document.removeEventListener("keydown" , this.screenBlockHandlerRef);
    }

    enableScreenBlockForPlayerScreen(playerNum){
        const screenBlockPlayer = document.getElementById(`player${playerNum}ScreenBlock`);

        screenBlockPlayer.style.position = "absolute";
        if(playerNum === 1){
            screenBlockPlayer.style.top = "0";
            screenBlockPlayer.style.left = "0";
        }else if(playerNum === 2){
            screenBlockPlayer.style.right = "0";
            screenBlockPlayer.style.bottom = "0";
        }

        screenBlockPlayer.style.height = "50vh";
        screenBlockPlayer.style.width = "100vw";
        screenBlockPlayer.style.backgroundColor = "white";
        screenBlockPlayer.style.zIndex = "20";
    }

    disableScreenBlockForPlayerScreen(playerNum){
        const screenBlockPlayer = document.getElementById(`player${playerNum}ScreenBlock`);

        screenBlockPlayer.style.height = "0px";
        screenBlockPlayer.style.width = "0px";
        screenBlockPlayer.style.backgroundColor = "transparent";
        screenBlockPlayer.style.zIndex = "0";
    }

    addEventListenerToPlayBtn(){
        const playBtn1 = document.getElementById("myGrid1PlayBtn");
        const playBtn2 = document.getElementById("myGrid2PlayBtn");
        const randomBtn1 = document.getElementById("myGrid1RandomPositionsOfShip");
        const randomBtn2 = document.getElementById("myGrid2RandomPositionsOfShip");
        const playBtnSuggestion1 = document.querySelector(".player1 > .details > p");
        const playBtnSuggestion2 = document.querySelector(".player2 > .details > p");

        playBtn2.disabled = true;
        randomBtn2.disabled = true;

        playBtn1.addEventListener("click" , () => {
            this.positionOfShips1 = this.placeShips1.getPositionsOfShips();
            this.placeShips1.disableAllEventListenersForMyGrid();
            this.player1Ready = true;
            playBtn1.remove();
            randomBtn1.remove();
            playBtn2.disabled = false;
            randomBtn2.disabled = false;
            playBtnSuggestion1.textContent = "";
            this.enableScreenBlockForPlayerScreen(1);
            this.checkToStartGame();
        });

        playBtn2.addEventListener("click" , () => {
            this.positionOfShips2 = this.placeShips2.getPositionsOfShips();
            this.placeShips2.disableAllEventListenersForMyGrid();
            this.player2Ready = true;
            playBtn2.remove();
            randomBtn2.remove();
            playBtnSuggestion2.textContent = "";
            this.enableScreenBlockForWholeScreen();
            this.disableScreenBlockForPlayerScreen(1);
            this.enableScreenBlockForPlayerScreen(2);
            this.checkToStartGame();   
        });
    }

    checkToStartGame(){
        if((this.player1Ready && this.player2Ready) === true){
            const opponentGrid1 = document.querySelector(".opponentGrid1");
            const opponentGrid2 = document.querySelector(".opponentGrid2");
            opponentGrid1.style.border = "1px solid red";
            opponentGrid2.style.border = "1px solid red";

            this.fillGrid("opponentGrid1");
            this.fillGrid("opponentGrid2");

            this.gameController = new GameController(this.positionOfShips1, this.positionOfShips2);

            this.addEventListenerToOpponentGrid1();
        }
    }

    addEventListenerToOpponentGrid1(){
        const opponentGrid1 = document.querySelector(".opponentGrid1");

        opponentGrid1.addEventListener("click" , this.player1Handler);
    }

    addEventListenerToOpponentGrid2(){
        const opponentGrid2 = document.querySelector(".opponentGrid2");

        opponentGrid2.addEventListener("click" , this.player2Handler);
    }

    removeListenerOnOpponentGrid1(){
        const opponentGrid1 = document.querySelector(".opponentGrid1");
        opponentGrid1.removeEventListener("click" , this.player1Handler);
    }

    removeListenerOnOpponentGrid2(){
        const opponentGrid2 = document.querySelector(".opponentGrid2");
        opponentGrid2.removeEventListener("click" , this.player2Handler);
    }

    changeColorOfCellWhilePlayer1Bombs(x,y){
        const cellInOpponentGrid1 = document.querySelector(`.opponentGrid1Cell[data-co-ordinate="${x}${y}"]`);
        const cellInMyGrid2 = document.querySelector(`.myGrid2Cell[data-co-ordinate="${x}${y}"]`);

        if(this.gameController.player2.playersBoard.board[x][y].shipName !== null){
            cellInOpponentGrid1.style.backgroundColor = "rgba(254, 0, 34, 0.38)";
            cellInMyGrid2.style.backgroundColor = "rgba(0, 230, 255, 0.38)";
            cellInMyGrid2.style.zIndex = "10";
            return;
        }

        cellInOpponentGrid1.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
        cellInMyGrid2.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
    }

    // rgba(78, 70, 74, 0.53) ----- light black
    // rgba(254, 246, 0, 0.48) ---- light yellow
    // rgba(254, 0, 34, 0.38) ----- light red
    // rgba(0, 230, 255, 0.38) ---- light blue

    changeColorOfCellWhilePlayer2Bombs(x,y){
        const cellInOpponentGrid2 = document.querySelector(`.opponentGrid2Cell[data-co-ordinate="${x}${y}"]`);
        const cellInMyGrid1 = document.querySelector(`.myGrid1Cell[data-co-ordinate="${x}${y}"]`);

        if(this.gameController.player1.playersBoard.board[x][y].shipName !== null){
            cellInOpponentGrid2.style.backgroundColor = "rgba(254, 0, 34, 0.38)";
            cellInMyGrid1.style.backgroundColor = "rgba(0, 230, 255, 0.38)";
            cellInMyGrid1.style.zIndex = "10";
            return;
        }

        cellInOpponentGrid2.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
        cellInMyGrid1.style.backgroundColor = "rgba(254, 246, 0, 0.48)";
    }

    async playRoundByPlayer1(e){
        if(e.target.classList.contains("opponentGrid1Cell")){
            const xAndYArray = e.target.dataset.coOrdinate.split('');
            const x = Number(xAndYArray[0]);
            const y = Number(xAndYArray[1]);

            const roundResult = this.gameController.playRound(x,y);
            if(roundResult === 'falseAttack') return;
            if(roundResult === 'nextRound'){
                this.addEventListenerToOpponentGrid2();
                this.removeListenerOnOpponentGrid1();
                this.changeColorOfCellWhilePlayer1Bombs(x,y);
                await new Promise(resolve => setTimeout(resolve, 500));
                this.enableScreenBlockForWholeScreen();
                this.enableScreenBlockForPlayerScreen(1);
                this.disableScreenBlockForPlayerScreen(2);
                return;
            }

            this.changeColorOfCellWhilePlayer1Bombs(x,y)
            this.displayWinner(roundResult);
            this.removeListenerOnOpponentGrid1();
            this.disableScreenBlockForWholeScreen();
            this.disableScreenBlockForPlayerScreen(2);
            return;
        }
    }

    async playRoundByPlayer2(e){
        if(e.target.classList.contains("opponentGrid2Cell")){
            const xAndYArray = e.target.dataset.coOrdinate.split('');
            const x = Number(xAndYArray[0]);
            const y = Number(xAndYArray[1]);

            const roundResult = this.gameController.playRound(x,y);
            if(roundResult === 'falseAttack') return;
            if(roundResult === 'nextRound'){
                this.addEventListenerToOpponentGrid1();
                this.removeListenerOnOpponentGrid2();
                this.changeColorOfCellWhilePlayer2Bombs(x,y);
                await new Promise(resolve => setTimeout(resolve, 500));
                this.enableScreenBlockForWholeScreen();
                this.enableScreenBlockForPlayerScreen(2);
                this.disableScreenBlockForPlayerScreen(1);
                return;
            }

            this.changeColorOfCellWhilePlayer2Bombs(x,y);
            this.displayWinner(roundResult);
            this.removeListenerOnOpponentGrid2();
            this.disableScreenBlockForWholeScreen();
            this.disableScreenBlockForPlayerScreen(1);
            return;
        }
    }

    displayWinner(playerName){
        const player1GameStatus = document.querySelector(".gameStatus1");
        const player2GameStatus = document.querySelector(".gameStatus2");

        if(playerName === 'Player 1'){
            player1GameStatus.textContent = 'You won!';
            player2GameStatus.textContent = 'You lost!';
        }else if(playerName === 'Player 2'){
            player2GameStatus.textContent = 'You won!!';
            player1GameStatus.textContent = 'You lost!';
        }

        player1GameStatus.style.fontSize = "3rem";
        player2GameStatus.style.fontSize = "3rem";

        const passAndPlayPageLink = document.createElement("a");
        const player1DetailsDiv = document.querySelector(".player1 > .details");
        
        passAndPlayPageLink.href = "./../passAndPlay.html";
        passAndPlayPageLink.textContent = "Play Again";
        player1DetailsDiv.appendChild(passAndPlayPageLink);
        passAndPlayPageLink.style.position = "relative";
        passAndPlayPageLink.style.zIndex = "40";
    }
}