let outputs = [];
const predictionPoint = 300;
const k = 5;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
    const result = _.chain(outputs)
        .map(row => [distance(row[0]), row[3]])
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
    .value()
  
    console.log('Your point will probably drop inside bucket #' + result)
}

function distance(point) {
	return Math.abs(point - predictionPoint)
}

function splitDataset(data, testCount) {
    const shuffled = _.shuffle(data);

    const testSet = _.slice(shuffled, 0, testCount);
    const traningSet = _.slice(shuffled, testCount);

    return [testSet, traningSet];
}
