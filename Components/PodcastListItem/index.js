import React, { useState } from 'react'
import {Alert, TouchableOpacity} from 'react-native'

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
    const [isDownloading, setIsDownloading] = useState(false)
    const [percent, setPercent] = useState(0)

    const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const percent = Math.round((totalBytesWritten / totalBytesExpectedToWrite) * 100)

        setPercent(percent)
    }

    const errorCallback = (error) => {
        errorAlert(`An error occurred while trying to download podcast with id ${id}`)
    }

    const onPressHandler = async () => {
        if (isDownloading) {
            return;
        }

        setIsDownloading(true)

        await downloadPodcast(id, title, progressCallback, () => {}, errorCallback);

        setIsDownloading(false)
    }

    return (
        <TouchableOpacity onPress={onPressHandler}>
            <PodcastListItemView>
                <TitleAndPic>
                    <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                    <PodcastTitle>{title}</PodcastTitle>
                </TitleAndPic>
                {(percent > 0) && (
                    <DownloadBar percent={percent} />
                )}
            </PodcastListItemView>
        </TouchableOpacity>
    );
}

export default PodcastListItem
