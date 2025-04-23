function generateInitialPointOfShip(lengthOfShip){
    let x = (Math.floor(Math.random()*10))%(10 - lengthOfShip + 1);
    let y = (Math.floor(Math.random()*10))%(10 - lengthOfShip + 1);
    return {x,y};
}

function generateRestOfThePointsOfShip(initialPoint , direction , lengthOfShip){
    let pointsOfShip = [];
    let x = initialPoint.x;
    let y = initialPoint.y;

    if(direction === 'vertical'){
        for(let i = 0 ; i < lengthOfShip ; i++){
            pointsOfShip.push({x,y});
            y++;
        }
        return pointsOfShip;
    }
    if(direction === 'horizontal'){
        for(let i = 0 ; i < lengthOfShip ; i++){
            pointsOfShip.push({x,y});
            x++;
        }
        return pointsOfShip;
    }
}

function generateBorderCellPoints(pointsOfShip , direction){
    let topLeftCorner = {x: pointsOfShip[0].x - 1, y: pointsOfShip[0].y - 1};
    let topRightCorner = {x: pointsOfShip[0].x + 1, y: pointsOfShip[0].y - 1};
    let bottomLeftCorner = {x: pointsOfShip[0].x - 1, y: pointsOfShip[0].y + 1};
    let boundariesOfShip = [];
    
    let x = topLeftCorner.x;
    let y = topLeftCorner.y;
    let length = pointsOfShip.length + 2;

    if(direction === 'vertical'){
        
        boundariesOfShip.push(...getSubsequentPoints(x,y,length,'vertical'));

        x = topRightCorner.x;
        y = topRightCorner.y;
        boundariesOfShip.push(...getSubsequentPoints(x,y,length,'vertical'));

        boundariesOfShip.push({x: pointsOfShip[0].x, y: pointsOfShip[0].y - 1});
        boundariesOfShip.push({x: pointsOfShip[pointsOfShip.length - 1].x, y: pointsOfShip[pointsOfShip.length - 1].y + 1});
        let validBoundariesOfShip = boundariesOfShip.filter((point) => {if(point.x >= 0 && point.x < 10 && point.y >= 0 && point.y < 10) return point;});
        return validBoundariesOfShip;
    }

    if(direction === 'horizontal'){
        boundariesOfShip.push(...getSubsequentPoints(x,y,length,'horizontal'));

        x = bottomLeftCorner.x;
        y = bottomLeftCorner.y;
        boundariesOfShip.push(...getSubsequentPoints(x,y,length,'horizontal'));

        boundariesOfShip.push({x: pointsOfShip[0].x - 1, y: pointsOfShip[0].y});
        boundariesOfShip.push({x:pointsOfShip[pointsOfShip.length - 1].x + 1, y: pointsOfShip[pointsOfShip.length - 1].y});
        let validBoundariesOfShip = boundariesOfShip.filter((point) => {if(point.x >= 0 && point.x < 10 && point.y >= 0 && point.y < 10) return point;});
        return validBoundariesOfShip;
    }
}

function getSubsequentPoints(x,y,length, direction){

    let arrayPoints = [];

    if(direction === 'vertical'){
        for(let i = 0 ; i < length ; i++){
            arrayPoints.push({x,y});
            y++;
        }
    }else if(direction === 'horizontal'){
        for(let i = 0 ; i < length ; i++){
            arrayPoints.push({x,y});
            x++;
        }
    }

    return arrayPoints;
}

function checkIfTwoPointsAreEqual(pointOne , pointTwo){
    if(pointOne.x === pointTwo.x && pointOne.y === pointTwo.y) return true;
    return false;
}

function getRandomPositionsOfShips(){
    let positionsOfShip = {};
    let shipAndBorderCells = [];

    let ships = ['Ship41', 'Ship31', 'Ship32', 'Ship21', 'Ship22', 'Ship23', 'Ship11', 'Ship12', 'Ship13', 'Ship14' ];
    let shipDirections = ['vertical', 'horizontal', 'horizontal', 'vertical', 'vertical', 'vertical', 'horizontal', 'horizontal', 'horizontal', 'horizontal'];
    
    const ininitialPointOfFirstShip = generateInitialPointOfShip(4);
    const pointsOfFirstShip = generateRestOfThePointsOfShip(ininitialPointOfFirstShip , 'vertical' , 4);
    const borderCellsOfFirstPoint = generateBorderCellPoints(pointsOfFirstShip, 'vertical');
    
    positionsOfShip[ships[0]] = [...pointsOfFirstShip];
    shipAndBorderCells = [...pointsOfFirstShip , ...borderCellsOfFirstPoint];

    for(let i = 1 ; i < ships.length; i++){
        const lengthOfShip = Number(ships[i].split('')[4]);
        const ininitialPointOfShip = generateInitialPointOfShip(lengthOfShip);
        const allPointsOfShip = generateRestOfThePointsOfShip(ininitialPointOfShip , shipDirections[i] , lengthOfShip );
        // check if any points in the ship is equal to a point in the shipandbordercells array
        let matchedPoints = allPointsOfShip.filter((point) => {
            for(let i = 0 ; i < shipAndBorderCells.length; i++){
                if(checkIfTwoPointsAreEqual(point , shipAndBorderCells[i])){
                    return point;
                }
            }
        })

        if(matchedPoints.length > 0){
            i--;
            continue;
        }

        positionsOfShip[ships[i]] = [...allPointsOfShip];
        const borderCellsOfShip = generateBorderCellPoints(allPointsOfShip, shipDirections[i]);
        shipAndBorderCells.push(...[...allPointsOfShip, ...borderCellsOfShip]);
    }

    console.log(positionsOfShip);
    console.log(shipAndBorderCells);
    return positionsOfShip;
}

function generateShipElements(positionsOfShip , classString){
    const shipNames = Object.keys(positionsOfShip);
    const shipPoints = Object.values(positionsOfShip);
    const containerDiv = document.querySelector(".container");
    let gridSize = 40;
    let direction;

    console.log(shipNames);
    console.log(shipPoints);

    for(let i = 0 ; i < shipNames.length ; i++){
        if(shipPoints[i].length === 1){
            direction = 'horizontal';
        }else if(shipPoints[i][0].x === shipPoints[i][1].x){
            direction = 'vertical';
        }else if(shipPoints[i][0].y === shipPoints[i][1].y){
            direction = 'horizontal';
        }

        const div = document.createElement("div");
        div.classList.add(`${classString}Ship`);
        div.id = `${classString}${shipNames[i]}`;

        if(direction === 'vertical'){
            div.style.width = `${gridSize}px`;
            div.style.height = `${gridSize*shipPoints[i].length}px`;
        }else if(direction === 'horizontal'){
            div.style.width = `${gridSize*shipPoints[i].length}px`;
            div.style.height = `${gridSize}px`;
        }

        div.style.position = "absolute";
        div.style.left = `${shipPoints[i][0].x*gridSize}px`;
        div.style.top = `${shipPoints[i][0].y*gridSize}px`;
        containerDiv.appendChild(div);
    }

}

generateShipElements(getRandomPositionsOfShips());