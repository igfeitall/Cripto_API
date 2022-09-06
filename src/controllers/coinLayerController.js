const file = require('./resEx.json');

// const ex = JSON.parse(file)

class coinLayer{

  getLive(){

    return {timestamp: file.timestamp, rates: file.rates}
  }
  
}

module.exports = new coinLayer()