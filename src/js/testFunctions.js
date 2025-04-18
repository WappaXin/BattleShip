function boundariesOfShip(left , top){
    let widthOfParent = 400;
    let heightOfParent = 400;
    //change width and height of child for different tests
    let widthOfChild = 40;
    let heightOfChild = 160;

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

function getPointsOfCellsInTheShip(initialPoint , direction , lengthOfShip){
    // let lengthOfShip = Number(this.selectedChild.id.slice(11,12));

    //for reference initialPoint = [left,top]
    let changeIndex;
    let unChangedIndex;
    if(direction === 'horizontal'){
        changeIndex = 0; //change left
        unChangedIndex = 1;
    }
    if(direction === 'vertical'){
        changeIndex = 1; //change top
        unChangedIndex = 0;
    }
    
    let pointsArray = [];
    let changedIndexValue = initialPoint[changeIndex];

    for(let i = 0 ; i <= lengthOfShip ; i++){
        if(i === 0){
            pointsArray[i] = initialPoint;
        }else {
            //can't use initialPoint[changeIndex] += 40, cause the last value
            // is going to be the only value that replaces all the incremented values
            // because of reference, lol wapita
            if(direction === 'horizontal'){
                changedIndexValue = changedIndexValue + 40;
                pointsArray[i] = [changedIndexValue , initialPoint[unChangedIndex]];
            }else if(direction === 'vertical'){
                changedIndexValue = changedIndexValue + 40;
                pointsArray[i] = [initialPoint[unChangedIndex] , changedIndexValue];
            }
        }
    }
    console.log(pointsArray);
    return pointsArray;
}

module.exports = getPointsOfCellsInTheShip;