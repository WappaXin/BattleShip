export class PlaceShips{
    constructor(playerGrid){
        this.playerGrid = playerGrid;
        this.gridSize = 50;
        this.ships = ['Ship41', 'Ship31', 'Ship21', 'Ship11'];
        this.shipElements = {};

        this.selectedChild = null;
        this.offsetLeftOfChild = 0;
        this.offsetTopOfChild = 0;

        this.parentElement = document.querySelector(`.${this.playerGrid}`);
        this.boundsOfParent = this.parentElement.getBoundingClientRect();

        this.mousedownHandler;
        this.mousemoveHandler;
        this.mouseupHandler;
        
        this.fillShipsInMyGrid(playerGrid);
        this.addListenersToShips();
    }

    // ['Ship41', 'Ship31', 'Ship32', 'Ship21', 'Ship22', 'Ship23', 'Ship11', 'Ship12', 'Ship13', 'Ship14' ];
    fillShipsInMyGrid(playerGrid){
        const myGrid = document.querySelector(`.${playerGrid}`);

        for(let i = 0 ; i < this.ships.length ; i++){
            const div = document.createElement("div");
            div.classList.add(`${playerGrid}Ship`);
            div.id = `${playerGrid}${this.ships[i]}`;
            myGrid.appendChild(div);
        }
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
        console.log('mousedown');
        if(e.target.classList.contains(`${this.playerGrid}Ship`)){
            this.offsetLeftOfChild = e.offsetX;
            this.offsetTopOfChild = e.offsetY;
            this.selectedChild = e.target;
            
            document.addEventListener("mousemove" , this.mousemoveHandler = this.mousemove.bind(this));
            document.addEventListener("mouseup" , this.mouseupHandler = this.mouseup.bind(this));
        }
    }

    mousemove(e){
        console.log('mousemove');
        
        if(this.selectedChild === null) return;
    
        const boundsOfChild = this.selectedChild.getBoundingClientRect();
    
        let a = e.clientX - this.boundsOfParent.left - this.offsetLeftOfChild;
        let b = e.clientY - this.boundsOfParent.top - this.offsetTopOfChild;
        // console.log(`e.clintX: ${e.clientX} , boundsOfParentLeft: ${this.boundsOfParent.left} , offsetleftOfChild: ${this.offsetLeftOfChild}`);
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
        console.log('mouseup');
        document.removeEventListener("mousemove" , this.mousemoveHandler);
        document.removeEventListener("mouseup" , this.mouseupHandler);
        if(this.selectedChild === null) return;
        
        const boundsOfChild = this.selectedChild.getBoundingClientRect();   
        
        let a = e.clientX - this.boundsOfParent.left - this.offsetLeftOfChild;
        let b = e.clientY - this.boundsOfParent.top - this.offsetTopOfChild;
        
        if(a < 0 || (a > 0 && a < this.gridSize*0.5) ) a = 0;
        if(b < 0 || (b > 0 && b < this.gridSize*0.5) ) b = 0;
        let c = this.boundsOfParent.width - boundsOfChild.width;
        let d = this.boundsOfParent.height - boundsOfChild.height;
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
    
        this.selectedChild.style.left = a + 'px';
        this.selectedChild.style.right = c - a  + 'px';
        this.selectedChild.style.top = b + 'px';
        this.selectedChild.style.bottom = d - b + 'px';
        
        this.selectedChild = null;
        console.log(`a: ${a} , b: ${b}`);
    }




}

