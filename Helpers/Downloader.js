// TODO: finish fully replacing expo-file-system
const FileSystem = require('expo-file-system');
import * as RNFS from 'react-native-fs';

async function downloadPodcast(program, streamUrl, fileName, progressCallback, done, error) {
    try {
        const downloader = FileSystem.createDownloadResumable(streamUrl, FileSystem.documentDirectory + fileName, {}, progressCallback);

        const { uri } = await downloader.downloadAsync();

        await RNFS.moveFile(uri, RNFS.DownloadDirectoryPath + '/' + fileName);

        done(fileName);
    } catch (e) {
        error(e);
    }
}

module.exports = downloadPodcast;
