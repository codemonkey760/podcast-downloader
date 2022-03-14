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

async function getPodcastDetails(podcast_ids, credentials) {
    const headers = {
        "X-Session-Id": credentials.sessionId,
        "X-User-Id": credentials.profileId
    };

    if (!Array.isArray(podcast_ids)) {
        podcast_ids = [podcast_ids];
    }

    if (podcast_ids.length < 1) {
        throw new Error('Cannot query details without podcast ids');
    }

    const data = {
        contentIds: podcast_ids,
        hostName: 'webapp.US',
        playedFrom: '514',
        stationId: '20635765',
        stationType: 'PODCAST'
    };

    const response = await axios.post('https://us.api.iheart.com/api/v2/playback/streams', data, {headers});
    if (response.status >= 400) {
        throw new Error();
    }

    return response.data;
}

module.exports = {
    getProgramPodcasts,
    getPodcastDetails
};
