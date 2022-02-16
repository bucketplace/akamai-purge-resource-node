const core = require('@actions/core')
const akamai_purge_resource_node = require("./akamai_purge_resource_node");


async function run(){
    const purge_url = core.getInput('purge_url', {required: false})
    const access_token = core.getInput('access_token', {required: true})
    const client_token = core.getInput('client_token', {required: true})
    const client_secret = core.getInput('client_secret', {required: true})
    const base_url = core.getInput('base_url', {required: true})


    await akamai_purge_resource_node.purge_resource_node(purge_url, access_token, client_token, client_secret, base_url)

}


run();