// dependencies
import React, { useState, useCallback } from 'react';
import { RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selectors
import { getSelectedProgramId } from '../../selectors/program';
import { getPodcastList } from '../../selectors/podcastList';

// actions
import {
    refreshPodcastList,
    startPodcastDownload,
    updatePodcastDownload,
    finishPodcastDownload
} from '../../actions/podcastListActions';

// locals
import PodcastListItem from "../PodcastListItem";
import  {
    PodcastListContainer,
    PodcastCountContainer,
    PodcastCount,
    PodcastCountSlider,
    StyledPodcastScrollView,
    RefreshHelperContainer,
    RefreshHelperHeader,
    RefreshHelperText
} from './styles';
import { getPodcastsForProgram } from '../../Helpers/PodcastHelper';

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

const PodcastListPage = ({ selectedProgramId, podcastList, refreshPodcastList }) => {
    const [isRefreshingList, setIsRefreshingList] = useState(false);
    const [podcastCount, setPodcastCount] = useState(1);

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true);

            try {
                console.log(`Looking for ${podcastCount} new Podcasts for ${selectedProgramId}`)
                const newPodcastsItems = await getPodcastsForProgram(selectedProgramId, podcastCount);
                console.log(JSON.stringify(newPodcastsItems))
                refreshPodcastList(newPodcastsItems);
            } catch (e) {
                console.log(e)
                errorAlert('An error occurred while trying to query for podcasts')
            }

            setIsRefreshingList(false);
        },
        [podcastCount]
    );

    console.log(JSON.stringify('PODCAST LIST'))
    console.log(JSON.stringify(podcastList))

    let listContents;
    if (podcastList.length > 0) {
        listContents = podcastList.map((podcast) => PodcastListItem(podcast))
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
        podcastList: getPodcastList(state)
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        refreshPodcastList,
        startPodcastDownload,
        updatePodcastDownload,
        finishPodcastDownload
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PodcastListPage);
