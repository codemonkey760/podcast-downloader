import { createUser } from '../Util/AuthClient';
import { getPodcastDetails } from '../Util/PodcastClient';

const credentialsReducer = ({ sessionId, profileId }) => ({ sessionId, profileId });
const streamUrlReducer = response => (response['items'][0]['streamUrl']);

export default async function downloadPodcast(podcastId, updateCallback, done, error) {
    const credentials = credentialsReducer(await createUser());
    const streamUrl = streamUrlReducer(await getPodcastDetails(podcastId, credentials));

    const fileName = getFileNameFromStreamUrl(streamUrl);
    const filePath = FileSystem.downloadDirectory + fileName;

    const result = await FileSystem.downloadAsync(streamUrl, filePath);
}