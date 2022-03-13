const { v4: uuidv4 } = require('uuid');
const { URLSearchParams } = require('url');
const axios = require('axios');

async function createUser() {
    let deviceId = uuidv4();
    let oauthUuid = uuidv4();
    let userName = `anon${oauthUuid}`;

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'DNT': '1',
        'Host': 'us.api.iheart.com',
    }

    let data = new URLSearchParams({
        'accessToken': 'anon',
        'accessTokenType': 'anon',
        'deviceId' : deviceId,
        'deviceName': 'web-desktop',
        'host': 'webapp.US',
        'oauthUuid': oauthUuid,
        'userName': userName,
    });

    const url = 'https://us.api.iheart.com/api/v1/account/loginOrCreateOauthUser';

    let response = await axios.post(url, data, {headers})

    if (response.status >= 400) {
        throw new Error(`Http error ${response.status}: ${response.statusText}`);
    }

    return response.data;
}

module.exports = { createUser };