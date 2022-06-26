import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native'
import { getProgram } from '../../selectors/programs'
import { getSimpleFileName } from '../../Util/Namer'

import {
    Container,
    Icon,
    Title,
    DetailsLink,
    DownloadBar,
    Details,
    FileNameText,
} from './styles';
import downloadPodcast from "../../Helpers/Downloader";

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

function PodcastListItem({ programId, id, imageUrl, title }) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [percent, setPercent] = useState(0)
    const program = useSelector(state => getProgram(state, programId))

    const fileName = getSimpleFileName(program, id, title)

    const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const percent = Math.round((totalBytesWritten / totalBytesExpectedToWrite) * 100)

        setPercent(percent)
    }

    const errorCallback = (error) => {
        errorAlert(`An error occurred while trying to download podcast with id ${id}: ${error.message}`)
    }

    const onTitlePressHandler = async () => {
        if (isDownloading) {
            return;
        }

        setIsDownloading(true)

        await downloadPodcast(program, id, title, progressCallback, () => {}, errorCallback);

        setIsDownloading(false)
    }

    const onInfoPressHandler = () => {
        alert('INFO!')
    }

    return (
        <Container>
            <Details>
                <Icon source={{uri: imageUrl}} alt={'podcast'} />
                <TouchableOpacity onPress={onTitlePressHandler}>
                    <Title>{title}</Title>
                </TouchableOpacity>
                <TouchableOpacity onPress={onInfoPressHandler}>
                    <DetailsLink>I</DetailsLink>
                </TouchableOpacity>
            </Details>
            {(percent > 0) && (
                <DownloadBar percent={percent} />
            )}
            {(percent <= 0) && (
                <FileNameText>{fileName}</FileNameText>
            )}
        </Container>
    );
}

export default PodcastListItem
