import React, { useState } from 'react';
import {Alert, TouchableOpacity} from 'react-native';

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
    DownloadBar,
    TitleAndPic
} from './styles';
import downloadPodcast from "../../Helpers/Downloader";

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

function PodcastListItem({ id, imageUrl, title }) {
    const [progress, setProgress] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)

    const onPress = async () => {
        if (isDownloading) {
            console.log(`ALREADY DOWNLOADING PODCAST ${id}`)

            return;
        }

        setIsDownloading(true)

        console.log('downloading podcast: ' + id);

        const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
            const percent = Math.round((totalBytesWritten / totalBytesExpectedToWrite) * 100)

            setProgress(percent)
            console.log(`Downloading: ${percent}`);
        };

        const done = fileName => {
            console.log(`Download to '${fileName}' completed`);
        };

        const error = e => {
            errorAlert(`An error occurred while trying to download podcast with id ${id}`)
        };

        await downloadPodcast(id, progressCallback, done, error);

        setIsDownloading(false)
    }

    return (
        <TouchableOpacity key={id} onPress={onPress}>
            <PodcastListItemView>
                <TitleAndPic>
                    <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                    <PodcastTitle>{title}</PodcastTitle>
                </TitleAndPic>
                {(progress > 0) && (
                    <DownloadBar progressPercent={progress} />
                )}
            </PodcastListItemView>
        </TouchableOpacity>
    );
}

export default PodcastListItem
