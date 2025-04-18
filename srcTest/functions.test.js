const getPointsOfCellsInTheShip = require("./../src/js/testFunctions");

test('boundaries of the ship, stuck to left border of the parent' , () => {
    expect(boundariesOfShip(0 , 120)).toMatchObject({
        leftB: 0,
        rightB: 80,
        topB: 80,
        bottomB: 200 
    })
})

test('boundaries of the ship, stuck to bottom border of the parent' , () => {
    expect(boundariesOfShip(120, 320)).toMatchObject({
        leftB: 80,
        rightB: 200,
        topB: 280,
        bottomB: 400 
    })
})

test('boundaries of the ship, stuck to right border of the parent' , () => {
    expect(boundariesOfShip(360, 40)).toMatchObject({
        leftB: 320,
        rightB: 400,
        topB: 0,
        bottomB: 120 
    })
})

test('boundaries of the ship, stuck to top border of the parent' , () => {
    expect(boundariesOfShip(360, 40)).toMatchObject({
        leftB: 320,
        rightB: 400,
        topB: 0,
        bottomB: 120 
    })
})

test('boundaries of the ship, not near border 1' , () => {
    expect(boundariesOfShip(120, 80)).toMatchObject({
        leftB: 80,
        rightB: 200,
        topB: 40,
        bottomB: 280 
    })
})


test('boundaries of the ship, not near border 2' , () => {
    expect(boundariesOfShip(160, 160)).toMatchObject({
        leftB: 120,
        rightB: 320,
        topB: 120,
        bottomB: 240 
    })
})

test('boundaries of the ship, near border in 1 cell' , () => {
    expect(boundariesOfShip(40, 200)).toMatchObject({
        leftB: 0,
        rightB: 120,
        topB: 160,
        bottomB: 400
    })
})

test.only('get co-ordinates of the every corner in a cell in a ship , vertical' , () => {
    expect(getPointsOfCellsInTheShip( [40,200] , 'vertical' , 4)).toEqual([
        [40,200] ,
        [40,240] ,
        [40,280] , 
        [40,320] , 
        [40,360]]
    )
});

test.only('get co-ordinates of the every corner in a cell in a ship , horizontal' , () => {
    expect(getPointsOfCellsInTheShip( [40,200] , 'horizontal' , 4)).toEqual([
        [40,200] ,
        [80,200] ,
        [120,200] , 
        [160,200] , 
        [200,200]]
    )
});

test.only('get co-ordinates of the every corner in a cell in a ship , vertical , length = 1' , () => {
    expect(getPointsOfCellsInTheShip( [40,200] , 'vertical' , 1)).toEqual([
        [40,200] ,
        [40,240]]
    )
});

test.only('get co-ordinates of the every corner in a cell in a ship , horizontal , length = 1' , () => {
    expect(getPointsOfCellsInTheShip( [40,200] , 'horizontal' , 1)).toEqual([
        [40,200] ,
        [80,200]]
    )
});