const path = require('path');
const axios = require('axios');
const config = require('../../config.js');
const fs = require('fs');
//const cars = require('../classifications/cars.js');
//const electricHybrids = require('../classifications/electricHybrids.js');
//const factoryTuner = require('../classifications/factory-tuner.js');
//const luxury = require('../classifications/luxury.js');
// const suvs = require('../classifications/suvs.js');
//const suvArray = require('../classifications/suvs.js');
//const trucks = require('../classifications/trucks.js');

const API_KEY = config.edmunds;

module.exports = (app, express) => {
  app.use('/', express.static(path.join(__dirname, '../../client')));
  app.use('/node', express.static(path.join(__dirname + '/../node_modules/')));

  app.post('/condition', (req, res) => {
    //console.log('server routes: ', req.body)
    const condition = req.body.condition;
    const url = `https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${API_KEY}&state=${condition}`;
    axios.get(url)
      .then(resp => {
        //console.log('routes: ', resp.data.makes);
        res.send(resp.data.makes);
      })
  });

  app.post('/modelDetails', (req, res) => {
    const modelSelected = req.body.modelMakeYear;
    const make = modelSelected.makeNiceName;
    const model = modelSelected.modelNiceName;
    const condition = modelSelected.condition;
    const year = modelSelected.year;


    const getStyleIdUrl = `https://api.edmunds.com/api/vehicle/v2/${make}/${model}?state=${condition}&year=${year}&view=basic&fmt=json&api_key=${API_KEY}`;

    axios.get(getStyleIdUrl)
      .then(resp => {
        //console.log('routes: ', resp.data)
        res.send(resp.data);
      })   
  })

  app.post('/styleDetails', (req, res) => {
    //console.log('req:styleDetails ', req.body);
    var styleId = req.body.styleId;
    // `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/engines?availability=standard&fmt=json&api_key=${API_KEY}`;
//styleId = 401671415;
    // const getSpecUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key=${API_KEY}`;
    const getSpecUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}?view=full&fmt=json&api_key=${API_KEY}`;

    axios.get(getSpecUrl)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        res.send(resp.data);
      })
  })

  app.post('/equipmentDetails', (req, res) => {
    var styleId = req.body.styleId;
// console.log('req:equipmentDetails ', styleId)
//styleId = 401671415;
    const getEquipmentUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key=${API_KEY}`;

    axios.get(getEquipmentUrl)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        res.send(resp.data);
      })
  })

  app.post('/photo', (req, res) => {

    var styleId = req.body.styleId;
styleId = 401671415;
    const getPhotoUrl = `https://api.edmunds.com/api/media/v2/styles/${styleId}/photos?api_key=${API_KEY}`;
console.log('getPhotoUrl ', getPhotoUrl)
    axios.get(getPhotoUrl)
      .then(resp => {
// console.log('getPhotoUrl: ', resp.data)
        res.send(resp.data);
      })
  })

  app.post('/suggestions', (req, res) => {
    console.log('/suggestions: ', req.body.vehicleClass);
    var respond;
    const vehicleClass = req.body.vehicleClass
    const type = vehicleClass.category.vehicleType.toLowerCase() + 's';
    const size = vehicleClass.category.vehicleSize.toLowerCase();

    var market = [];
    market = vehicleClass.category.market.toLowerCase().split(',');
    console.log('market : ', market);

    const carObj = {
      make: vehicleClass.make.niceName,
      model: vehicleClass.model.niceName,
      submodel: vehicleClass.submodel.niceName
    }

    console.log('carObj: ', carObj)
    // check vehicleType: car, suv, trucks, van
    // check vehicleSize: compact, midsize, large
    // check market, etc... crossover, factory-tuner, luxury, performance
    const jsonPath = `../carpare/server/classifications/${type}.json`;
    console.log('jsonPath: ', jsonPath)
      fs.readFile(jsonPath, 'utf8', (err, data) => {
        if(err) throw err;

        const obj = JSON.parse(data);
        console.log('read file data: ', obj);

        // if vehicle size does not exist
        if(!([size] in obj)) {
          obj[size] = { [market[0]] : [ carObj ] };
          writeToJSON(obj, type);
          // set respond to a str for no suggestions
          respond = carObj;
        }

        // if market does not exist
        if(!([market[0]] in obj[size])) {
          obj[size][market[0]] = [ carObj ];
          writeToJSON(obj, type);
          // set respond to a str for no suggestions
          respond = carObj;
        }

        var marketArray = obj[size][market[0]];
        console.log('marketArray: ', marketArray)
        // car is not part of market array
        var found = false;
        marketArray.forEach(car => {
          if(car.make === carObj.make && car.model === carObj.model && car.submodel === carObj.submodel) {
            found = true;
          }
        })

        if(!found) {
          marketArray.push(carObj);
          writeToJSON(obj, type);
        }

        const randomize = Math.floor((marketArray.length) * Math.random());
        console.log('randomize: ', randomize)
        const selectedCar = marketArray[randomize];
        console.log('selectedCar: ', selectedCar)
        if(selectedCar.make === carObj.make && selectedCar.model === carObj.model && selectedCar.submodel === carObj.submodel) {
          marketArray[randomize];
        }

        respond = marketArray[randomize];
        res.send(respond);

      })
  })
}

const writeToJSON = (jsonObj, type) => {
  fs.writeFile(`../carpare/server/classifications/${type}.json`, JSON.stringify(jsonObj, null, 2), (err) => {
    if(err) { console.error(err); return; }
    console.log("Created!");
  })
}

    // http://gyandeeps.com/json-file-write/
    // https://evdokimovm.github.io/javascript/nodejs/2016/11/11/write-data-to-local-json-file-using-nodejs.html
/*
        let differentMarket; 
        // console.log('market: ', market[0])
        // console.log('obj[size]: ', obj[size])
        if(size && obj[size][market[0]]){
          // console.log('1', obj[size][market[0]])
          differentMarket = obj[size][market[0]];
        } else {
          // create a size
          // console.log('2')
          obj[size] = { [market[0]]: [] };
          differentMarket = obj[size][market[0]];
        console.log('differentMarket 1: ', differentMarket)
        console.log('obj1: ', obj)
          differentMarket.push(carObj);
        console.log('differentMarket 2: ', differentMarket)
          console.log('obj2: ', obj)
          fs.writeFile('../carpare/server/classifications/suvs.json', JSON.stringify(obj, null, 4), (err) => {
            if(err) { console.error(err); return; }
            console.log("File has been created");
          })
        }

        differentMarket;

        // returns a single car object
        // of shared market class for suggestions
        let respond;
        if(differentMarket.length > 0) {
          const arrayLength = differentMarket.length + 1;
          const randomize = Math.floor((differentMarket.length + 1) * Math.random());
          const selectedVehicle = differentMarket[randomize];

          if(carObj === selectedVehicle) {
            if(arrayLength >= randomize) {
              respond = differentMarket[randomize - 1];
            }else{
              respond = differentMarket[randomize + 1];
            }
          }
        } else {
          differentMarket.push(carObj);
          respond = "No suggestions available"
        }

        respond;


        res.send(respond);
        
        fs.writeFile('../carpare/server/classifications/suvs.json', JSON.stringify(carObj, null, 4), (err) => {
          if(err) { console.error(err); return; }
          console.log("File has been created");
        })
*/