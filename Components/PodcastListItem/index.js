import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
    DownloadBar, TitleAndPic
} from './styles';

export default function PodcastListItem({ podcast, onPress, progressPercent}) {
    const {id, title, imageUrl} = podcast;

    return (
        <TouchableOpacity key={id} onPress={onPress}>
            <PodcastListItemView>
                <TitleAndPic>
                    <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                    <PodcastTitle>{title}</PodcastTitle>
                </TitleAndPic>
                <DownloadBar progressPercent={progressPercent} />
            </PodcastListItemView>
        </TouchableOpacity>
    );
}
