const FileSystem = require('expo-file-system');
import * as MediaLibrary from 'expo-media-library'
const { createUser } = require('../Util/AuthClient');
const { getPodcastDetails } = require('../Util/PodcastClient');

const credentialsReducer = ({ sessionId, profileId }) => ({ sessionId, profileId });
const streamUrlReducer = response => (response['items'][0]['streamUrl']);

const getFileName = (ext, podcastId) => (podcastId + '.' + ext);
const getFileExtFromStreamUrl = streamUrl => (streamUrl.split('/').pop().split('?')[0].split('.').pop());

async function downloadPodcast(podcastId, progressCallback, done, error) {
    const perm = await MediaLibrary.getPermissionsAsync(true)
    if (perm.status !== MediaLibrary.PermissionStatus.GRANTED) {
        console.log('failed to get media library permission ... aborting download')

        done('')

        return
    }

    try {
        console.log('Starting download');
        const credentials = credentialsReducer(await createUser());
        console.log('Got creds: ' + JSON.stringify(credentials));
        const streamUrl = streamUrlReducer(await getPodcastDetails(podcastId, credentials));
        console.log('Got stream url: ' + streamUrl);

        const fileName = getFileName(getFileExtFromStreamUrl(streamUrl), podcastId);
        console.log('Made a filename: ' + fileName);

        console.log('And here we go');

        const downloader = FileSystem.createDownloadResumable(streamUrl, FileSystem.direc + fileName, {}, progressCallback);

        await downloader.downloadAsync();

        done(fileName);
    } catch (e) {
        error(e);
    }
}

module.exports = downloadPodcast;