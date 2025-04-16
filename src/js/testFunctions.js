function boundariesOfShip(left , top){
    let widthOfParent = 400;
    let heightOfParent = 400;
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

module.exports = boundariesOfShip;