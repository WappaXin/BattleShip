export class PlaceShips{
    
    constructor(playerGrid){
        this.playerGrid = playerGrid;
        this.gridSize = 40;
        this.ships = ['Ship41', 'Ship31', 'Ship32', 'Ship21', 'Ship22', 'Ship23', 'Ship11', 'Ship12', 'Ship13', 'Ship14' ];
        this.shipElements = {};
        this.boundariesOfShip = {};

        this.selectedChild = null;
        this.originalLeftOfShip = null;
        this.originalTopOfShip = null;
        this.offsetLeftOfChild = 0;
        this.offsetTopOfChild = 0;

        this.parentElement = document.querySelector(`.${this.playerGrid}`);
        this.boundsOfParent = this.parentElement.getBoundingClientRect();

        this.mousedownHandler;
        this.mousemoveHandler;
        this.mouseupHandler;
        
        this.fillShipsInMyGrid(playerGrid);
        this.addListenersToShips();
        this.getInitialBoundaries();
    }

    fillShipsInMyGrid(playerGrid){
        const myGrid = document.querySelector(`.${playerGrid}`);

        for(let i = 0 ; i < this.ships.length ; i++){
            const div = document.createElement("div");
            div.classList.add(`${playerGrid}Ship`);
            div.id = `${playerGrid}${this.ships[i]}`;
            myGrid.appendChild(div);
        }
    }

    getInitialBoundaries(){
        let shipElements = Object.values(this.shipElements);
        let shipIds = Object.keys(this.shipElements);

        for(let i = 0 ; i < shipElements.length ; i++){
            let styleMapOfShip = shipElements[i].computedStyleMap();

            let leftOfShipFromParentBorder = styleMapOfShip.get('left').value;
            let topOfShipFromParentBorder = styleMapOfShip.get('top').value;

            this.boundariesOfShip[shipIds[i]] = this.getBoundariesOfShip(leftOfShipFromParentBorder , topOfShipFromParentBorder, shipElements[i]);
        }
    }

    getBoundariesOfShip(left , top , selectedChild){
        let boundsOfParent = this.boundsOfParent;
        let boundsOfChild = selectedChild.getBoundingClientRect();

        let widthOfParent = boundsOfParent.width;
        let heightOfParent = boundsOfParent.height;
        let widthOfChild = boundsOfChild.width;
        let heightOfChild = boundsOfChild.height;
    
        let leftB = left - 40;
        let rightB = left + widthOfChild + 40;
        let topB = top - 40;
        let bottomB = top + heightOfChild + 40;
    
        if(rightB > widthOfParent) rightB = widthOfParent;
        if(bottomB > heightOfParent) bottomB = heightOfParent;
        if(leftB < 0) leftB = 0;
        if(topB < 0) topB = 0;
    
        return { leftB: leftB ,  rightB: rightB , topB: topB , bottomB: bottomB};
    }

    addListenersToShips(){
        const shipIds = this.ships.map((element) => {
            return `${this.playerGrid}` + element;
        })

        for(let i = 0 ; i < shipIds.length ; i++){
            this.shipElements[this.ships[i]] = document.getElementById(`${shipIds[i]}`);
            this.shipElements[this.ships[i]].addEventListener("mousedown" , this.mousedownHandler = this.mousedown.bind(this));
        }
    }

    mousedown(e){
        if(e.target.classList.contains(`${this.playerGrid}Ship`)){
            this.offsetLeftOfChild = e.offsetX;
            this.offsetTopOfChild = e.offsetY;

            this.selectedChild = e.target;

            let styleMapOfSelectedChild = this.selectedChild.computedStyleMap();

            this.originalLeftOfShip = styleMapOfSelectedChild.get('left').value;
            this.originalTopOfShip = styleMapOfSelectedChild.get('top').value;

            this.selectedChild.style.zIndex = "10";

            document.addEventListener("mousemove" , this.mousemoveHandler = this.mousemove.bind(this));
            document.addEventListener("mouseup" , this.mouseupHandler = this.mouseup.bind(this));
        }
    }

    mousemove(e){
        if(this.selectedChild === null) return;

        const boundsOfChild = this.selectedChild.getBoundingClientRect();
    
        let a = e.clientX - this.boundsOfParent.left - this.offsetLeftOfChild;
        let b = e.clientY - this.boundsOfParent.top - this.offsetTopOfChild;

        if(a < 0) a = 0;
        if(b < 0) b = 0;
        let c = this.boundsOfParent.width - boundsOfChild.width;
        let d = this.boundsOfParent.height - boundsOfChild.height;  
        if(a > c) a = c;
        if(b > d) b = d; 
        
        this.selectedChild.style.left = a + 'px';
        this.selectedChild.style.top = b + 'px';
    }
    
    mouseup(e){
        document.removeEventListener("mousemove" , this.mousemoveHandler);
        document.removeEventListener("mouseup" , this.mouseupHandler);
        if(this.selectedChild === null) return;
                
        let a = e.clientX - this.boundsOfParent.left - this.offsetLeftOfChild;
        let b = e.clientY - this.boundsOfParent.top - this.offsetTopOfChild;
        
        let x = this.getLeftAndTopDistanceDuringMouseup(a , b);
        a = x.a; b = x.b; let c = x.c; let d = x.d;

        // if the a and b are of the values in the
        // range of boundaries then place it where
        // it originally was, only change the position if the 
        // values are not in the range of boundaries
        if(this.checkIfShipIsInOtherShipsTerritory(a, b) === true){

            a = this.originalLeftOfShip;
            b = this.originalTopOfShip;

            const boundsOfChild = this.selectedChild.getBoundingClientRect();

            c = this.boundsOfParent.width - boundsOfChild.width ;
            d = this.boundsOfParent.height - boundsOfChild.height;
        }
        
        this.selectedChild.style.left = a + 'px';
        this.selectedChild.style.right = c - a  + 'px';
        this.selectedChild.style.top = b + 'px';
        this.selectedChild.style.bottom = d - b + 'px';

        // update the boundaries of the new position of the ship
        this.boundariesOfShip[this.selectedChild.id.slice(7)] = this.getBoundariesOfShip(a,b,this.selectedChild);

        this.selectedChild.style.removeProperty("z-index");
        this.selectedChild = null;
        this.originalLeftOfShip = null;
        this.originalTopOfShip= null;
    }

    getLeftAndTopDistanceDuringMouseup(a , b){
        const boundsOfChild = this.selectedChild.getBoundingClientRect();   
        
        let c = this.boundsOfParent.width - boundsOfChild.width;
        let d = this.boundsOfParent.height - boundsOfChild.height;
        
        if(a < 0 || (a > 0 && a < this.gridSize*0.5) ) a = 0;
        if(b < 0 || (b > 0 && b < this.gridSize*0.5) ) b = 0;
        if(a > c) a = c;
        if(b > d) b = d;

        if(a >= this.gridSize*0.5 && a < this.gridSize) a = this.gridSize;
        if(b >= this.gridSize*0.5 && b < this.gridSize) b = this.gridSize;
        
        if(a >= this.gridSize && a <= c){
            const modOfA = a%this.gridSize;
            if(modOfA >= this.gridSize*0.5) a = a + this.gridSize - modOfA;
            if(modOfA < this.gridSize*0.5) a = a - modOfA;
        }
        
        if(b >= this.gridSize && b <= d){
            const modOfB = b%this.gridSize;
            if(modOfB >= this.gridSize*0.5) b = b + this.gridSize - modOfB;
            if(modOfB < this.gridSize*0.5) b = b - modOfB;
        }

        return {a: a , b: b , c: c , d: d};
    }

    checkIfShipIsInOtherShipsTerritory(left , top){

        const boundsOfChild = this.selectedChild.getBoundingClientRect();   
        let leftTopCorner = [left , top];
        let rightTopCorner = [left + boundsOfChild.width, top];
        let leftBottomCorner = [left , top + boundsOfChild.height];
        let rightBottomCorner = [left + boundsOfChild.width, top + boundsOfChild.height];
        
        if( (this.checkIfPointIsInAnyShipArea(leftTopCorner)    ||
            this.checkIfPointIsInAnyShipArea(rightTopCorner)    ||
            this.checkIfPointIsInAnyShipArea(leftBottomCorner)  ||
            this.checkIfPointIsInAnyShipArea(rightBottomCorner)) === true
         )  return true;

         return false;
    }
    
    checkIfPointIsInAnyShipArea([left , top]){
        let shipIds = Object.keys(this.boundariesOfShip);
        let shipBoundaries = Object.values(this.boundariesOfShip);

        for(let i = 0 ; i < shipBoundaries.length ; i++){
            if(this.selectedChild.id.slice(7) === shipIds[i]){
                console.log(`skipped ${shipIds[i]}`);
                continue;
            }
            
            let leftB = shipBoundaries[i].leftB;
            let rightB = shipBoundaries[i].rightB;
            let topB = shipBoundaries[i].topB;
            let bottomB = shipBoundaries[i].bottomB;

            if(leftB === 0 ) leftB-- ;
            if(topB === 0 ) topB-- ;
            if(rightB === 400) rightB++ ;
            if(bottomB === 400) bottomB++ ;

            if(left > leftB && left < rightB && top > topB && top < bottomB){
                
                return true;
            }
        }

        return false;
    }
}
