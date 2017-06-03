const path = require('path');
const axios = require('axios');
const config = require('../../config.js');

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
    const styleId = req.body.styleId;
    // `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/engines?availability=standard&fmt=json&api_key=${API_KEY}`;

    // const getSpecUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key=${API_KEY}`;
    const getSpecUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}?view=full&fmt=json&api_key=${API_KEY}`;

    axios.get(getSpecUrl)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        res.send(resp.data);
      })
  })

  app.post('/equipmentDetails', (req, res) => {
    const styleId = req.body.styleId;
// console.log('req:equipmentDetails ', styleId)
    const getEquipmentUrl = `https://api.edmunds.com/api/vehicle/v2/styles/${styleId}/equipment?availability=standard&equipmentType=OTHER&fmt=json&api_key=${API_KEY}`;

    axios.get(getEquipmentUrl)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        res.send(resp.data);
      })
  })

}