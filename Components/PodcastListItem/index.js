import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native'
import { getProgram } from '../../selectors/programs'

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
    DownloadBar,
    TitleAndPic,
    FileNameText,
} from './styles';
import downloadPodcast from "../../Helpers/Downloader";

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

function PodcastListItem({ programId, id, imageUrl, title }) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [percent, setPercent] = useState(0)
    const program = useSelector(state => getProgram(state, programId))

    const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const percent = Math.round((totalBytesWritten / totalBytesExpectedToWrite) * 100)

        setPercent(percent)
    }

    const errorCallback = (error) => {
        errorAlert(`An error occurred while trying to download podcast with id ${id}: ${error.message}`)
    }

    const onPressHandler = async () => {
        if (isDownloading) {
            return;
        }

        setIsDownloading(true)

        await downloadPodcast(program, id, title, progressCallback, () => {}, errorCallback);

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
                {(percent <= 0) && (
                    <FileNameText>AAAAHHHHH!!!!!</FileNameText>
                )}
            </PodcastListItemView>
        </TouchableOpacity>
    );
}

export default PodcastListItem
