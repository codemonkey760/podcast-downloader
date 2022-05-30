// TODO: finish fully replacing expo-file-system
const FileSystem = require('expo-file-system');
import * as RNFS from 'react-native-fs';
const { createUser } = require('../Util/AuthClient');
const { getPodcastDetails } = require('../Util/PodcastClient');
import { getFileName } from '../Util/Namer'

const credentialsReducer = ({ sessionId, profileId }) => ({ sessionId, profileId });
const streamUrlReducer = response => (response['items'][0]['streamUrl']);

async function downloadPodcast(program, podcastId, title, progressCallback, done, error) {
    try {
        console.log('Starting download');
        const credentials = credentialsReducer(await createUser());
        console.log('Got creds: ' + JSON.stringify(credentials));
        const streamUrl = streamUrlReducer(await getPodcastDetails(podcastId, credentials));
        console.log('Got stream url: ' + streamUrl);

        const fileName = getFileName(program, podcastId, title, streamUrl);
        console.log('Made a filename: ' + fileName);

        console.log('And here we go');

        const downloader = FileSystem.createDownloadResumable(streamUrl, FileSystem.documentDirectory + fileName, {}, progressCallback);

        const { uri } = await downloader.downloadAsync();
        console.log('Downloaded to ' + uri);

        const dest = RNFS.DownloadDirectoryPath + '/' + fileName;
        console.log('Trying to move');
        console.log(uri);
        console.log('to');
        console.log(dest);

        await RNFS.moveFile(uri, RNFS.DownloadDirectoryPath + '/' + fileName);

        done(fileName);
    } catch (e) {
        error(e);
    }
}

module.exports = downloadPodcast;
