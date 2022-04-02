const podcastsClient = require('../Util/PodcastClient');

async function getPodcastsForProgram(programId, limit) {
    const response = await podcastsClient.getProgramPodcasts(programId, limit);

    return response.map(reducePodcast);
}

function reducePodcast({id, title, startDate, imageUrl}) {
    return {id, title, startDate, imageUrl}
}

module.exports = {
    getPodcastsForProgram
};