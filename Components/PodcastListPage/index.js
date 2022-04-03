import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import PodcastListItem from "../PodcastListItem";
import  { StyledPodcastScrollView } from './styles';

import { getPodcastsForProgram } from '../../Helpers/PodcastHelper';

export default function PodcastListPage({ navigation }) {
    const [podcastList, setPodcastList] = useState([]);
    const [isRefreshingList, setIsRefreshingList] = useState(false);

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true);

            const jkId = 20635765;
            const jkLimit = 4;

            const newPodcastsItems = await getPodcastsForProgram(jkId, jkLimit);

            setPodcastList(
                newPodcastsItems
            );

            setIsRefreshingList(false);
        },
        []
    );

    const onPodcastPress = () => {
        navigation.navigate('PodcastViewPage');
    }

    const listItems = podcastList.map((podcast) => PodcastListItem({podcast, onPress: onPodcastPress}));

    return (
        <StyledPodcastScrollView
            refreshControl={<RefreshControl refreshing={isRefreshingList} onRefresh={onRefresh} />}
        >
            {listItems}
        </StyledPodcastScrollView>
    );
}
