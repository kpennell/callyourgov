const axios = require('axios');

var helpers = {
  getData: function(zip) {
    return axios.get(`http://api.openweathermap.org/data/2.5/location/daily?type=accurate&q=${zip}&units=imperial&APPID=d9fc64db58ba5246727c67582661226a&cnt=5`).then( response => {
      return response.data;
    }).catch(e => {
      console.warn('Error retrieving data', e);
    });
  }
};

module.exports = helpers;
