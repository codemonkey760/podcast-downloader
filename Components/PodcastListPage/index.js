// dependencies
import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selectors
import { getSelectedProgramId } from '../../selectors/program';
import { getPodcastListForProgram } from '../../selectors/podcastList';

// actions
import { refreshPodcastList } from '../../actions/podcastListActions';

// locals
import PodcastListItem from "../PodcastListItem";
import  { StyledPodcastScrollView } from './styles';
import { getPodcastsForProgram } from '../../Helpers/PodcastHelper';

const PodcastListPage = ({ navigation, selectedProgramId, podcastList, refreshPodcastList }) => {
    const [isRefreshingList, setIsRefreshingList] = useState(false);

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true);

            console.log('SELECT PROGRAM ID FOR REFRESH ', selectedProgramId);
            const newPodcastsItems = await getPodcastsForProgram(selectedProgramId, 4);
            refreshPodcastList(selectedProgramId, newPodcastsItems);

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
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PodcastListPage);