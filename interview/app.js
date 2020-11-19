const data = {
    designId: 1,
    shapes: [
        { shapeId: 'basic-shape', color: { r: 55, g: 40, b: 255 }, children: [] },
        {
            shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
                { shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: [] },
                { shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: [] },
                { shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: [] },
            ]
        },
        { shapeId: 'zigzag-polygon', color: { r: 205, g: 255, b: 252 }, children: [] },
        {
            shapeId: 'fish', color: { r: 205, g: 255, b: 252 }, children: [
                { shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: [] },
                {
                    shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
                        { shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: [] },
                        { shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: [] },
                        { shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: [] },
                    ]
                },
                { shapeId: 'fish-tail', color: { r: 255, g: 5, b: 255 }, children: [] },
            ]
        },
        {
            shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
                { shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: [] },
                { shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: [] },
                { shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: [] },
            ]
        },
    ]
}


// GET /design/id

function myFetch(url) {
    const prom = new Promise((resolve, reject) => {
        setTimeout(resolve(data), 1000)
    })
    return prom
}

const promiseArray = []
for (let i = 0; i < 10; i++) {
    promiseArray.push(myFetch(`/design/${i}`));
}

// promise.all stuff below
Promise.all(promiseArray).then((designs) => {
    const memo = {}
    designs.forEach((design) => {
        const [r, b, g, num] = sumRGBForShape(design.shapes, memo)
        console.log(`rAvg: ${r / num}, gAvg: ${g / num}, bAvg: ${b / num}`)
    })
});

function sumRGBForShape(shapesArray) {
    let rValue = 0;
    let gValue = 0;
    let bValue = 0;
    let shapeNum = shapesArray.length
    shapesArray.forEach((shape) => {
        rValue += shape.color.r
        gValue += shape.color.g
        bValue += shape.color.b
    })
    // loop through the children of shapes
    shapesArray.forEach((shape) => {
        // check if it has children
        if (shape.children.length) {
            const [rChildAvg, bChildAvg, gChildAvg, shapeNumChild] = sumRGBForShape(shape.children)
            rValue += rChildAvg
            bValue += bChildAvg
            gValue == gChildAvg
            shapeNum += shapeNumChild
        }
    })

    return [rValue, bValue, gValue, shapeNum]
}



