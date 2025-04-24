export class computerAttackSystem{
    constructor(){
        this.opponentBoard = [];
        this.attackOrder = [];
        this.initialPointOfShip = null;
        this.checkPositions = [];
        this.fillBoard();
    }

    fillBoard(){
        for(let i = 0 ; i < 10 ; i++){
            this.opponentBoard[i] = [];
            for(let j = 0 ; j < 10 ; j++){
                this.opponentBoard[i][j] = {bombed: false , shipPresent: false};
            }
        }
    }

    getRandomValidPoint(){
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);

        if(this.opponentBoard[x][y].bombed === false){
            return {x,y};
        }

        return this.getRandomValidPoint(); 
    }

    checkValidityOfPoint(point){
        if(point.x >= 0 && point.x < 10 && point.y >= 0 && point.y < 10){
            if(this.opponentBoard[point.x][point.y].bombed === false){
                return true;
            }
        }
        return false;
    }

    getAttackPoint(){
        if(this.attackOrder.length < 1){
            let point = this.getRandomValidPoint();
            this.attackOrder.push(point);
            this.opponentBoard[point.x][point.y].bombed = true;
            return point;
        }

        let x = this.attackOrder[this.attackOrder.length - 1].x;
        let y = this.attackOrder[this.attackOrder.length - 1].y;

        let pointIfScenario1 = this.randomAttackShipPresent(x,y);
        if(pointIfScenario1 !== null){
            this.opponentBoard[pointIfScenario1.x][pointIfScenario1.y].bombed = true;
            return pointIfScenario1;
        }

        let pointIfScenario2 = this.checkPositionButShipNotPresent(x,y);
        if(pointIfScenario2 !== null){
            this.opponentBoard[pointIfScenario2.x][pointIfScenario2.y].bombed = true;
            return pointIfScenario2;
        }

        let pointIfScenario3 = this.foundShipDirection(x,y);
        if(pointIfScenario3 !== null){
            this.opponentBoard[pointIfScenario3.x][pointIfScenario3.y].bombed = true;
            return pointIfScenario3;
        }

        // scenario 4 - if you just want a random point
        let point = this.getRandomValidPoint();
        this.attackOrder.push(point);
        this.opponentBoard[point.x][point.y].bombed = true;
        return point;
    }

    // get next attack point- if a random attack has hit a part of a ship
    randomAttackShipPresent(x,y){
        if(this.opponentBoard[x][y].shipPresent === true && this.initialPointOfShip === null){
            // random attack --> hit a part of ship --> record the random attack point as initial point
            this.initialPointOfShip = {x,y};
            
            let checkPositions = [ {x: x - 1, y: y} , {x: x + 1, y: y} , {x: x, y: y - 1} , {x: x, y: y + 1} ];
            for(let i = 0 ; i < checkPositions.length ; i++){
                let checkPoint = checkPositions[i]; 
                if( this.checkValidityOfPoint(checkPoint) === true){
                    this.checkPositions.push(checkPoint);
                }
            }

            if(this.checkPositions.length < 1){
                this.initialPointOfShip = null;
            
                let point = this.getRandomValidPoint();
                this.attackOrder.push(point);
                return point;
            }

            let checkPoint = this.checkPositions.pop();
            this.attackOrder.push(checkPoint);
            return checkPoint;
        }

        return null;
    }

    // get next attack point- if random attack hit a ship and you are trying to find the ship direction
    checkPositionButShipNotPresent(x,y){
        if(this.initialPointOfShip !== null && this.opponentBoard[x][y].shipPresent === false){
            if(this.checkPositions.length < 1){
                this.initialPointOfShip = null;

                let point = this.getRandomValidPoint();
                this.attackOrder.push(point); 
                return point;
            }

            let checkPoint = this.checkPositions.pop();
            this.attackOrder.push(checkPoint);
            return checkPoint;
        }

        return null;
    }

    // get next attack point- if you have found the ship direction
    // create a trigger variable and also check the opposite direction after you find the ship direction
    foundShipDirection(x,y){
        if(this.initialPointOfShip !== null && this.opponentBoard[x][y].shipPresent === true){
            let a = null; let b = null;
            if(x === this.initialPointOfShip.x) a = x;
            if(y === this.initialPointOfShip.y) b = y;

            if(a === null){
                if(x > this.initialPointOfShip.x){
                    a = x + 1;
                }else if(x < this.initialPointOfShip.x){
                    a = x - 1;
                }
            }

            if(b === null){
                if(y > this.initialPointOfShip.y){
                    b = y + 1;
                }else if(y < this.initialPointOfShip.y){
                    b = y - 1;
                }
            }

            if(this.checkValidityOfPoint({a,b}) === true){
                this.attackOrder.push({a,b});
                return {a,b};
            }

            this.checkPositions = [];
            this.initialPointOfShip = null;

            let point = this.getRandomValidPoint();
            this.attackOrder.push(point); 
            return point;

        }

        return null;
    }
}