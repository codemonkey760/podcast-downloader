const FileSystem = require('expo-file-system');
const { createUser } = require('../Util/AuthClient');
const { getPodcastDetails } = require('../Util/PodcastClient');

const credentialsReducer = ({ sessionId, profileId }) => ({ sessionId, profileId });
const streamUrlReducer = response => (response['items'][0]['streamUrl']);

const getFileName = (ext, podcastId) => (podcastId + '.' + ext);
const getFileExtFromStreamUrl = streamUrl => (streamUrl.split('/',2)[-1].split('?',2)[0].split('.')[-1]);

async function downloadPodcast(podcastId, progressCallback, done, error) {
    try {
        console.log('Starting download');
        const credentials = credentialsReducer(await createUser());
        console.log('Got creds: ' + JSON.stringify(credentials));
        const streamUrl = streamUrlReducer(await getPodcastDetails(podcastId, credentials));
        console.log('Got stream url: ' + streamUrl);

        const fileName = getFileName(getFileExtFromStreamUrl(streamUrl), podcastId);
        console.log('Made a filename: ' + fileName);

        console.log('And here we go');

        const downloader = FileSystem.createDownloadResumable(streamUrl, FileSystem.documentDirectory + fileName, {}, progressCallback);

        await downloader.downloadAsync();
    } catch (e) {
        error(e);

        return;
    }

    done(fileName);
}

module.exports = downloadPodcast;