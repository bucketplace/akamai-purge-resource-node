const EdgeGrid = require('akamai-edgegrid');

export async function purge_resource_node(purge_url, access_token, client_token, client_secret, base_url) {
    const eg = new EdgeGrid(
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
                body: JSON.stringify({
                    "objects": [
                        purge_url
                    ]
                })
            });
            eg.send(function(error, response) {
                if (error == null) {
                    console.log('akamai cache purge is completed.')
                    resolve({
                        success: true,
                        body: response.data,
                        error: null,
                    });
                } else {
                    console.log('Fakamai cache purge is failed.')
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