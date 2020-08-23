exports.triggerLots = function (maxLots) {
    let lots = [];
    for (let index = 1; index <= maxLots; index++) {
        lots.push(index);        
    }
    return lots;
  };
  