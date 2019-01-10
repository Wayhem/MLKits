const _ = require('lodash');
const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
    console.log(outputs);
    _.sortBy(outputs, row => row[3])
}

function runAnalysis() {
  // Write code here to analyze stuff
}

