let outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
    const testSize = 100;
    let [testSet, traningSet] = splitDataset(outputs, testSize); 
    
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

function minMax(data, featureCount) {
    const clonedData = _.cloneDeep(data);

    for (i=0; i<featureCount;i++){
        const column = clonedData.map(row => row[i]);

        const min = _.min(column);
        const max = _.max(column);
        
        for (j=0; j<clonedData.length;j++) {
            clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
        }
    }

    return clonedData;
}
