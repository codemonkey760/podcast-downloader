import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
} from './styles';

export default function PodcastListItem({ podcast, onPress}) {
    const {id, title, imageUrl} = podcast;

    return (
        <TouchableOpacity key={id} onPress={onPress}>
            <PodcastListItemView>
                <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                <PodcastTitle>{title}</PodcastTitle>
            </PodcastListItemView>
        </TouchableOpacity>
    );
}
