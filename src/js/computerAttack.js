export class computerAttackSystem{
    constructor(){
        this.opponentBoard = [];
        this.attackOrder = [];
        this.initialPointOfShip = null;
        this.initialDirectionFoundGoOppositeDirection = false;
        this.oppositeDirectionFulfilled = false;
        this.goInitialDirection = false;
        this.initialDirectionPoint = null;
        this.checkPositions = [];
        this.fillBoard();
    }

    setVaribleConditonsToDefault(){
        this.initialPointOfShip = null;
        this.initialDirectionFoundGoOppositeDirection = false;
        this.oppositeDirectionFulfilled = false;
        this.goInitialDirection = false;
        this.initialDirectionPoint = null;
        this.checkPositions = [];
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
            this.attackOrder.push(pointIfScenario1);
            this.opponentBoard[pointIfScenario1.x][pointIfScenario1.y].bombed = true;
            return pointIfScenario1;
        }

        let pointIfScenario2 = this.checkPositionButShipNotPresent(x,y);
        if(pointIfScenario2 !== null){
            this.attackOrder.push(pointIfScenario2);
            this.opponentBoard[pointIfScenario2.x][pointIfScenario2.y].bombed = true;
            return pointIfScenario2;
        }

        let pointIfScenario3 = this.foundShipDirectionGoOpposite(x,y);
        if(pointIfScenario3 !== null){
            this.attackOrder.push(pointIfScenario3);
            this.opponentBoard[pointIfScenario3.x][pointIfScenario3.y].bombed = true;
            return pointIfScenario3;
        }

        let pointIfScenario4 = this.completeOppositeDirectionIfShipPresentInOppositeDirection(x,y);
        if(pointIfScenario4 !== null){
            this.attackOrder.push(pointIfScenario4);
            this.opponentBoard[pointIfScenario4.x][pointIfScenario4.y].bombed = true;
            console.log(pointIfScenario4);
            return pointIfScenario4;
        }

        let pointIfScenario5 = this.oppositeDirectionFulfilledGoInitialDirection(x,y);
        if(pointIfScenario5 !== null){
            this.attackOrder.push(pointIfScenario5);
            this.opponentBoard[pointIfScenario5.x][pointIfScenario5.y].bombed = true;
            return pointIfScenario5;
        }

        let pointIfScenario6 = this.fulfillIntialDirection(x,y);
        if(pointIfScenario6 !== null){
            this.attackOrder.push(pointIfScenario6);
            this.opponentBoard[pointIfScenario6.x][pointIfScenario6.y].bombed = true;
            return pointIfScenario6;
        }

        // scenario 7 - the whole ship has sunk so guess the next one
        let point = this.getRandomValidPoint();
        this.attackOrder.push(point);
        this.opponentBoard[point.x][point.y].bombed = true;
        return point;
    }

    // get next attack point- if a random attack has hit a part of a ship
    randomAttackShipPresent(x,y){
        if(this.opponentBoard[x][y].shipPresent === true && this.initialPointOfShip === null && this.initialDirectionFoundGoOppositeDirection === false && this.oppositeDirectionFulfilled === false && this.goInitialDirection === false){
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

                return null;
            }

            let checkPoint = this.checkPositions.pop();
            return checkPoint;
        }

        return null;
    }

    // get next attack point- if random attack hit a ship and you are trying to find the ship direction
    checkPositionButShipNotPresent(x,y){
        if(this.opponentBoard[x][y].shipPresent === false && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === false && this.oppositeDirectionFulfilled === false && this.goInitialDirection === false){
            if(this.checkPositions.length < 1){
                this.initialPointOfShip = null;

                return null;
            }

            let checkPoint = this.checkPositions.pop();
            return checkPoint;
        }

        return null;
    }

    // get next attack point- if you have found the ship direction but check opposite direction first
    // if your initial random hit on the ship was in the middle of the ship- then you have to check both directions
    foundShipDirectionGoOpposite(x,y){
        if(this.opponentBoard[x][y].shipPresent === true && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === false && this.oppositeDirectionFulfilled === false && this.goInitialDirection === false){
            this.checkPositions = [];
            this.initialDirectionFoundGoOppositeDirection = true;
            this.initialDirectionPoint = {x: x, y: y};

            let a = null; let b = null;
            if(x === this.initialPointOfShip.x) a = x;
            if(y === this.initialPointOfShip.y) b = y;
            
            if(a === null){
                if(x > this.initialPointOfShip.x){
                    a = this.initialPointOfShip.x - (x - this.initialPointOfShip.x);
                }else if(x < this.initialPointOfShip.x){
                    a = this.initialPointOfShip.x + (this.initialPointOfShip.x - x);
                }
            }
            
            if(b === null){
                if(y > this.initialPointOfShip.y){
                    b = this.initialPointOfShip.y - (y - this.initialPointOfShip.y);
                }else if(y < this.initialPointOfShip.y){
                    b = this.initialPointOfShip.y + (this.initialPointOfShip.y - y);
                }
            }

            if(this.checkValidityOfPoint({x: a,y: b}) === true){
                return {x: a,y: b};
            }

            this.oppositeDirectionFulfilled = true;
            return null;
        }

        return null;
    }

    // while attacking the intial point in the opposite direction we check if the attack was succesfull or not
    completeOppositeDirectionIfShipPresentInOppositeDirection(x,y){
        if(this.opponentBoard[x][y].shipPresent === false && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === true && this.oppositeDirectionFulfilled === false && this.goInitialDirection === false){
            this.oppositeDirectionFulfilled = true;
            return null;
        }

        if(this.opponentBoard[x][y].shipPresent === true && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === true && this.oppositeDirectionFulfilled === false && this.goInitialDirection === false){
            let nextPoint = this.shipDirectionFoundTathakayeeeeeeeee(x,y);
            
            if(nextPoint !== null){
                return nextPoint;
            }

            this.oppositeDirectionFulfilled = true;
            return null;
        }
        return null;
    }

    // if (opposite direction)-(initial point) is not valid then its prev attack has ship present
    // so we include that possibitlity here so we can remove the shipPresent condition being false,
    // its better to remove than include two conditions with true and false for shipPresent as it will get lengthy
    // another reason is, this is run only once in the destruction of the whole ship process
    oppositeDirectionFulfilledGoInitialDirection(x,y){
        if(this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === true && this.oppositeDirectionFulfilled === true && this.goInitialDirection === false){
            this.goInitialDirection = true;

            const a = this.initialDirectionPoint.x;
            const b = this.initialDirectionPoint.y;

            const nextPoint = this.shipDirectionFoundTathakayeeeeeeeee(a,b);
            if(nextPoint !== null){
                return nextPoint;
            }

            this.setVaribleConditonsToDefault();
            return null;
        }
        return null;
    }

    fulfillIntialDirection(x,y){
        if(this.opponentBoard[x][y].shipPresent === false && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === true && this.oppositeDirectionFulfilled === true && this.goInitialDirection === true){
            this.setVaribleConditonsToDefault();
            return null;
        }

        if(this.opponentBoard[x][y].shipPresent === true && this.initialPointOfShip !== null && this.initialDirectionFoundGoOppositeDirection === true && this.oppositeDirectionFulfilled === true && this.goInitialDirection === true){
            const nextPoint = this.shipDirectionFoundTathakayeeeeeeeee(x,y);
            if(nextPoint !== null){
                return nextPoint;
            }

            this.setVaribleConditonsToDefault();
            return null;
        }
        return null;
    }

    // find next adjacent point
    // THATHAKAYEEEEEEEEEEE!!!!!!!!!!!!!! SUSUMEEEEEEEEEEE!!!!!!!!!!!!
    shipDirectionFoundTathakayeeeeeeeee(x,y){
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

        if(this.checkValidityOfPoint({x: a,y: b}) === true){
            return {x: a,y: b};
        }

        return null;
    }
}