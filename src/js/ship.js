export class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunkValidity = false;
        this.co_ordinates = [];
    }

    hit(){
        if(this.hits < this.length){
            this.hits++;
            this.isSunk();
        }
    }

    isSunk(){
        if(this.length === this.hits){
            this.sunkValidity = true;
        }
    }
}