import React from 'react';

import {
    PodcastListItemDiv,
    PodcastIcon,
    PodcastTitle,
} from './styles';

export default function PodcastListItem({id, title, imageUrl}) {
    return (
        <PodcastListItemDiv key={id}>
            <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
            <PodcastTitle>{title}</PodcastTitle>
        </PodcastListItemDiv>
    );
}