import React, { useState } from 'react';
import PodcastListItem from "../PodcastListItem";
import RefreshButton from '../RefreshButton';
import  {StyledPodcastList } from './styles';

import { getPodcastsForProgram } from '../../Helpers/PodcastHelper';

export default function PodcastList() {
    const [podcastList, setPodcastList] = useState([]);
    const [isRefreshingList, setIsRefreshingList] = useState(false);

    const refreshButtonPressHandler = async () => {
        setIsRefreshingList(true);

        const jkId = 20635765;
        const jkLimit = 20;

        const newPodcastsItems = await getPodcastsForProgram(jkId, jkLimit);

        setPodcastList(
            newPodcastsItems
        );

        setIsRefreshingList(false);
    };

    const renderPodcastList = () => {
        const listItems = podcastList.map((podcast) => PodcastListItem(podcast));

        return (
            <StyledPodcastList>
                {listItems}
            </StyledPodcastList>
        );
    };

    const renderRefreshButton = () => {
        return (
            <RefreshButton
                disabled={isRefreshingList}
                onPress={refreshButtonPressHandler}
            />
        );
    }

    return (podcastList.length > 1) ? renderPodcastList() : renderRefreshButton();
}