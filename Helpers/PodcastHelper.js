import { createUser } from '../Util/AuthClient'
import { getPodcastDetails, getProgramPodcasts } from '../Util/PodcastClient'

function getStreamUrlFromDetails(id, podcastDetails) {
    for (let i = 0; i < podcastDetails.length; ++i) {
        if (podcastDetails[i].content.id === id) {
            return podcastDetails[i].streamUrl;
        }
    }

    throw new Error(`Stream url missing from details response for ${id}`)
}

function addStreamUrlsFromDetailsResponse(podcastList, podcastDetails) {
    if (podcastList.length !== podcastDetails.length) {
        throw new Error('Podcast details response length mismatch')
    }

    for (let i = 0; i < podcastList.length; ++i) {
        podcastList[i].streamUrl = getStreamUrlFromDetails(podcastList[i].id, podcastDetails)
    }

    return podcastList
}

export async function getPodcastsForProgram(programId, limit) {
    const response = await getProgramPodcasts(programId, limit);

    let podcastList = response.map(({ id, title, startDate, imageUrl, description }) =>
        ({ id, title, startDate, imageUrl, description }))
    const ids = podcastList.map(({ id }) => (id))

    const { sessionId, profileId } = await createUser()
    const podcastDetails = (await getPodcastDetails(ids, { sessionId, profileId }))['items']

    return addStreamUrlsFromDetailsResponse(podcastList, podcastDetails)
}
