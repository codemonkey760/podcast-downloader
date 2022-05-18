// dependencies
import React, { useState, useCallback } from 'react';
import { RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selectors
import { getSelectedProgramId } from '../../selectors/program';
import { getPodcastList } from '../../selectors/podcastList';

// actions
import { refreshPodcastList } from '../../actions/podcastListActions';

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
import downloadPodcast from "../../Helpers/Downloader";

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

const PodcastListPage = ({ selectedProgramId, podcastList, refreshPodcastList }) => {
    const [isRefreshingList, setIsRefreshingList] = useState(false);
    const [podcastCount, setPodcastCount] = useState(1);
    const [downloadList, setDownloadList] = useState({'666': 50});
    const updateDownload = (id, progress) => {
        const newDownloadList = {...downloadList}

        newDownloadList[id] = progress

        setDownloadList(newDownloadList)
    }
    const isDownloading = (id) => (downloadList[id] && downloadList[id] < 100)

    const createOnPressHandler = (id, title) => (
        async () => {
            if (isDownloading(id)) {
                console.log(`ALREADY DOWNLOADING PODCAST ${id}`)

                return;
            }

            console.log('downloading podcast: ' + id);

            const progressCallback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
                const percent = Math.round((totalBytesWritten / totalBytesExpectedToWrite) * 100)

                updateDownload(id, percent)
                console.log(`Downloading: ${percent}`);
            };

            const done = fileName => {
                console.log(`Download to '${fileName}' completed`);
            };

            const error = e => {
                errorAlert(`An error occurred while trying to download podcast with id ${id}`)
            };

            await downloadPodcast(id, title, progressCallback, done, error);
        }
    )

    const onRefresh = useCallback(
        async () => {
            setIsRefreshingList(true);

            try {
                const newPodcastsItems = await getPodcastsForProgram(selectedProgramId, podcastCount);
                refreshPodcastList(newPodcastsItems);
            } catch (e) {
                console.log(e)
                errorAlert('An error occurred while trying to query for podcasts')
            }

            setIsRefreshingList(false);
        },
        [podcastCount]
    );

    let listContents;
    if (podcastList.length > 0) {
        listContents = podcastList.map(({ id, imageUrl, title }) => (
            <PodcastListItem
                key={id}
                id={id}
                imageUrl={imageUrl}
                title={title}
                downloadList={downloadList}
                onPress={createOnPressHandler(id, title)}
            />
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
        podcastList: getPodcastList(state)
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({refreshPodcastList}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PodcastListPage);
