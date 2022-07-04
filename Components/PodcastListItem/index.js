import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getProgram } from '../../selectors/programs'
import { getFileName } from '../../Util/Namer'

import {
    Container,
    Icon,
    Title,
    DetailsLink,
    DownloadBar,
    Details,
    FileNameText,
    TouchableTitle,
    TouchableDetailsLink
} from './styles'

import downloadPodcast from '../../Helpers/Downloader'

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

function PodcastListItem({ programId, id, imageUrl, title, description, streamUrl }) {
    const navigation = useNavigation()
    const [isDownloading, setIsDownloading] = useState(false)
    const [percent, setPercent] = useState(0)
    const program = useSelector(state => getProgram(state, programId))

    const fileName = getFileName(program, id, title, streamUrl)

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

        await downloadPodcast(program, streamUrl, fileName, progressCallback, () => {}, errorCallback);

        setIsDownloading(false)
    }

    const onInfoPressHandler = () => {
        navigation.navigate({
            name: 'PodcastDetailsPage',
            params: {
                podcastId: id,
                title,
                description,
                imageUrl,
                fileName
            }
        })
    }

    return (
        <Container>
            <Details>
                <Icon source={{uri: imageUrl}} alt={'podcast'} />
                <TouchableTitle onPress={onTitlePressHandler}>
                    <Title>{title}</Title>
                </TouchableTitle>
                <TouchableDetailsLink onPress={onInfoPressHandler}>
                    <DetailsLink>I</DetailsLink>
                </TouchableDetailsLink>
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
