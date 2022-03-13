const axios = require('axios');

async function getProgramPodcasts(program_id, limit= 1) {
    const url = `https://us.api.iheart.com/api/v3/podcast/podcasts/${program_id}/episodes`
    const params = {
        limit
    };

    const response = await axios.get(url, {params});
    if (response.status >= 400) {
        throw new Error();
    }

    return response.data.data;
}

module.exports = {
    getProgramPodcasts
};
