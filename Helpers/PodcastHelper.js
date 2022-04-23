import { getProgramPodcasts } from '../Util/PodcastClient'

export async function getPodcastsForProgram(programId, limit) {
    const response = await getProgramPodcasts(programId, limit);

    return response.map(reducePodcast);
}

function reducePodcast({id, title, startDate, imageUrl}) {
    return {id, title, startDate, imageUrl}
}