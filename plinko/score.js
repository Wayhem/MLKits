let outputs = [];
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
    const testSize = 10;
    let [testSet, traningSet] = splitDataset(outputs, testSize); 
    let counter = 0;
    testSet.forEach(element => {
        const bucket = knn(traningSet, element[0]);
        console.log(`The prediction is bucket #${bucket}, tested element bucket is #${element[3]}`)
        if (bucket === element[3]){
            counter++;
        }
    });
    console.log(`Accuracy: ${(counter/testSize)*100}%`);
}

function distance(point, predictionPoint) {
	return Math.abs(point - predictionPoint)
}

function splitDataset(data, testCount) {
    const shuffled = _.shuffle(data);

    const testSet = _.slice(shuffled, 0, testCount);
    const traningSet = _.slice(shuffled, testCount);

    return [testSet, traningSet];
}

function knn(data, point) {
    return _.chain(data)
        .map(row => [distance(row[0], point), row[3]])
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
