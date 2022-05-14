// dependencies
import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selectors
import { getSelectedProgramId } from '../../selectors/program';
import { getPodcastListForProgram } from '../../selectors/podcastList';

// actions
import {
    refreshPodcastList,
    startPodcastDownload,
    updatePodcastDownload,
    finishPodcastDownload
} from '../../actions/podcastListActions';

// locals
import PodcastListItem from "../PodcastListItem";
import  { StyledPodcastScrollView } from './styles';
import { getPodcastsForProgram } from '../../Helpers/PodcastHelper';
import downloadPodcast from '../../Helpers/Downloader';

const PodcastListPage = ({ selectedProgramId, podcastList, refreshPodcastList }) => {
    const [isRefreshingList, setIsRefreshingList] = useState(false);

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true);

            const newPodcastsItems = await getPodcastsForProgram(selectedProgramId, 8);
            refreshPodcastList(selectedProgramId, newPodcastsItems);

            setIsRefreshingList(false);
        },
        []
    );

    const listItems = podcastList.map((podcast) => PodcastListItem({
        podcast, onPress: async () => {
            startPodcastDownload(podcast.id);
            console.log('downloading podcast: ' + podcast.id);

            const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
                console.log(
                    `Downloading: ${totalBytesWritten} / ${totalBytesExpectedToWrite}`
                );
            };

            const done = fileName => {
                console.log(`Download to '${fileName}' completed`);
            };

            const error = e => {
                console.log('An error occurred')
                console.log(JSON.stringify(e));
            };

            await downloadPodcast(podcast.id, progressCallback, done, error);

            finishPodcastDownload(podcast.id);
        }, progressPercent: 100
    }));

    return (
        <StyledPodcastScrollView
            refreshControl={<RefreshControl refreshing={isRefreshingList} onRefresh={onRefresh} />}
        >
            {listItems}
        </StyledPodcastScrollView>
    );
}

const mapStateToProps = (state) => {
    const selectedProgramId = getSelectedProgramId(state);

    return {
        selectedProgramId,
        podcastList: getPodcastListForProgram(state, selectedProgramId)
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
