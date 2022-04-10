const RNFetchBlob = require('rn-fetch-blob');

const { createUser } = require('../Util/AuthClient');
const { getPodcastDetails } = require('../Util/PodcastClient');

const credentialsReducer = ({ sessionId, profileId }) => ({ sessionId, profileId });
const streamUrlReducer = response => (response['items'][0]['streamUrl']);

const getFileName = (ext, podcastId) => (podcastId + '.' + ext);
const getFileExtFromStreamUrl = streamUrl => (streamUrl.split('/',2)[-1].split('?',2)[0].split('.')[-1]);

async function downloadPodcast(podcastId, progressCallback, done, error) {
    console.log('Starting download');
    const credentials = credentialsReducer(await createUser());
    console.log('Got creds: ' + JSON.stringify(credentials));
    const streamUrl = streamUrlReducer(await getPodcastDetails(podcastId, credentials));
    console.log('Got stream url: ' + streamUrl);

    const fileName = getFileName(getFileExtFromStreamUrl(streamUrl), podcastId);
    console.log('Made a filename: ' + fileName);

    console.log('And here we go');
    RNFetchBlob
        .config({
            fileCache: true,
            path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName
        })
        .fetch('GET', streamUrl)
        .progress({ count: 1 }, progressCallback)
        .then(res => {
            done(res);
            res.flush();
        })
        .catch(err => {
            error(err);
            err.flush();
        });
}

module.exports = downloadPodcast;