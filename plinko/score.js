let outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
    const testSize = 100;
    let [testSet, traningSet] = splitDataset(outputs, testSize); 
    // REFACTORED THIS SECTION TO LODASH FUNCTIONS.
    // let counter = 0;
    // testSet.forEach(element => {
    //     const bucket = knn(traningSet, element[0]);
    //     console.log(`The prediction is bucket #${bucket}, tested element bucket is #${element[3]}`)
    //     if (bucket === element[3]){
    //         counter++;
    //     }
    // });
    // console.log(`Accuracy: ${(counter/testSize)*100}%`);
    _.range(1, 20).forEach(k => {
        const results = _.chain(testSet)
        .filter(testPoint => {
            return knn(traningSet, _.initial(testPoint), k) === testPoint[3];
        })
        .size()
        .divide(testSize)
        .value();
    
        console.log(`K is ${k} and accuracy: ${results*100}%`); 
    });
}

function distance(pointA, pointB) {
    return _.chain(pointA)
        .zip(pointB)
        .map(([a, b]) => (a-b) ** 2)
        .sum()
        .value() ** 0.5;
}

function splitDataset(data, testCount) {
    const shuffled = _.shuffle(data);

    const testSet = _.slice(shuffled, 0, testCount);
    const traningSet = _.slice(shuffled, testCount);

    return [testSet, traningSet];
}

function knn(data, point, k) {
    return _.chain(data)
        .map(row => {
            return [
                distance(_.initial(row), point), 
                _.last(row)
            ]
        })
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
        .value()
}
