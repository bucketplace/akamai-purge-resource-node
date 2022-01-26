var EdgeGrid = require('akamai-edgegrid');

exports.handler = async (event) => { 
  var eg = new EdgeGrid(
    event.headers.client_token,
    event.headers.client_secret,
    event.headers.access_token,
    event.headers.base_url
  );

  if (event.body) {


    const data = await new Promise((resolve, reject) => {
      eg.auth({
        path: '/ccu/v3/delete/url/production',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.parse(event.body)
      });
      eg.send(function(error, response) {
        if (error == null) {
          resolve({
            success: true,
            response,
            body: JSON.stringify(response.data),
            error: null,
          });
        } else {
          reject({
            success: false,
            error
          });
        }
      })
    });


    return {
      data,
    }
  } else {
    return { success: false };
  }
}