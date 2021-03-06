import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

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

    const rawData = {
        accessToken: 'anon',
        accessTokenType: 'anon',
        deviceId: deviceId,
        deviceName: 'web-desktop',
        host: 'webapp.US',
        oauthUuid: oauthUuid,
        userName: userName
    }

    const data = Object.keys(rawData).map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(rawData[key])
    ).join('&')

    const url = 'https://us.api.iheart.com/api/v1/account/loginOrCreateOauthUser';

    try {
        let response = await axios.post(url, data, {headers})

        return response.data;
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser };