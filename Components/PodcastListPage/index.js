// dependencies
import React, { useState, useCallback } from 'react'
import { RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'

//selectors
import { getSelectedProgramId } from '../../selectors/program'

// locals
import PodcastListItem from "../PodcastListItem"
import  {
    PodcastListContainer,
    PodcastCountContainer,
    PodcastCount,
    PodcastCountSlider,
    StyledPodcastScrollView,
    RefreshHelperContainer,
    RefreshHelperHeader,
    RefreshHelperText
} from './styles'

import { getPodcastsForProgram } from '../../Helpers/PodcastHelper'

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

const PodcastListPage = ({ selectedProgramId }) => {
    const [isRefreshingList, setIsRefreshingList] = useState(false)
    const [podcastList, setPodcastList] = useState([])
    const [podcastCount, setPodcastCount] = useState(1)

    const logAndSetPodcastList = (newPodcastList) => {
        console.log(JSON.stringify(newPodcastList))
        setPodcastList(newPodcastList)
    }

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true)

            try {
                const newPodcastsItems = await getPodcastsForProgram(selectedProgramId, podcastCount)
                logAndSetPodcastList(newPodcastsItems)

            } catch (e) {
                console.log(e)
                errorAlert('An error occurred while trying to query for podcasts')
            }

            setIsRefreshingList(false)
        },
        [podcastCount]
    );

    let listContents;
    if (podcastList.length > 0) {
        listContents = podcastList.map(({ id, imageUrl, title }) => (
            <PodcastListItem key={Math.random()} id={id} imageUrl={imageUrl} title={title} />
        ))
    } else {
        listContents = (
            <RefreshHelperContainer>
                <RefreshHelperHeader>NO PODCASTS KNOWN FOR THIS PROGRAM</RefreshHelperHeader>
                <RefreshHelperText>Drag down to query current program for podcasts</RefreshHelperText>
            </RefreshHelperContainer>
        )
    }

    return (
        <PodcastListContainer>
            <PodcastCountContainer>
                <PodcastCount>{podcastCount}</PodcastCount>
                <PodcastCountSlider maximumValue={8} minimumValue={1} step={1} value={podcastCount} onValueChange={newValue => setPodcastCount(newValue)} />
            </PodcastCountContainer>
            <StyledPodcastScrollView
                refreshControl={<RefreshControl refreshing={isRefreshingList} onRefresh={onRefresh} />}
            >
                {listContents}
            </StyledPodcastScrollView>
        </PodcastListContainer>
    );
}

const mapStateToProps = (state) => {
    const selectedProgramId = getSelectedProgramId(state);

    return {
        selectedProgramId,
    }
}

export default connect(mapStateToProps)(PodcastListPage);
