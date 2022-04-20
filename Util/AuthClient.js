require('react-native-get-random-values');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

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

    let data = new URLSearchParams();
    data.append('accessToken', 'anon');
    data.append('accessTokenType', 'anon');
    data.append('deviceId', deviceId);
    data.append('deviceName', 'web-desktop');
    data.append('host', 'webapp.US');
    data.append('oauthUuid', oauthUuid);
    data.append('userName', userName);

    const url = 'https://us.api.iheart.com/api/v1/account/loginOrCreateOauthUser';

    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(config => {
        console.log('Request Logging Axios Interceptor:');
        console.log(JSON.stringify(config));
    });

    try {
        let response = await axiosInstance.post(url, data, {headers})

        return response.data;
    } catch (e) {
        console.error('An HTTP error occurred');
        console.log(e.response.status);

        throw e;
    }
}

module.exports = { createUser };