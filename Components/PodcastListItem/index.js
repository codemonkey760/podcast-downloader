import React from 'react';
import { TouchableOpacity } from 'react-native';
import { getPodcast } from '../../selectors/podcastList'
import { useSelector } from 'react-redux'

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
    DownloadBar, TitleAndPic
} from './styles';

function PodcastListItem({ id, onPress }) {
    const { imageUrl, progress, title } = useSelector((state) => getPodcast(state, id))

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
