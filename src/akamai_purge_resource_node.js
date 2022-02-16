const EdgeGrid = require('akamai-edgegrid');

export async function purge_resource_node(purge_url, access_token, client_token, client_secret, base_url) {
    var eg = new EdgeGrid(
        client_token,
        client_secret,
        access_token,
        base_url
    );

    if (purge_url) {
        const data = await new Promise((resolve, reject) => {
            eg.auth({
                path: '/ccu/v3/delete/url/production',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "objects": [
                        purge_url
                    ]
                }
            });
            eg.send(function(error, response) {
                if (error == null) {
                    resolve({
                        success: true,
                        body: response.data,
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