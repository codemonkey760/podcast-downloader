import {
    FINISH_PODCAST_DOWNLOAD,
    REFRESH_PODCAST_LIST,
    START_PODCAST_DOWNLOAD,
    UPDATE_PODCAST_DOWNLOAD
} from '../actions/podcastListActions';

const PODCAST_LIST_INITIAL_STATE = {};

export const podcastListReducer = (state = PODCAST_LIST_INITIAL_STATE, action) => {
    switch(action.type) {
        case REFRESH_PODCAST_LIST:
            const newState = {
                ...state
            };
            newState[action.payload.programId] = action.payload.newPodcastList;

            return newState;
        default:
            return state;
    }
};

const PODCAST_DOWNLOAD_INITIAL_STATE = {
    currentPodcast: null,
    progress: 0,
};

export const podcastDownloadReducer = (state = PODCAST_DOWNLOAD_INITIAL_STATE, action) => {
    const newState = {
        ...state
    };

    switch(action.type) {
        case START_PODCAST_DOWNLOAD:
            newState.currentPodcast = action.payload.podcastId;
            newState.progress = 0;

            return newState;
        case UPDATE_PODCAST_DOWNLOAD:
            newState.progress = action.payload.progress;

            return newState;

        case FINISH_PODCAST_DOWNLOAD:
            newState.currentPodcast = null;
            newState.progress = 0

            return newState;
        default:
            return newState;
    }
}