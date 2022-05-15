import { REFRESH_PODCAST_LIST } from '../actions/podcastListActions';

const PODCAST_LIST_INITIAL_STATE = [];

export const podcastListReducer = (state = PODCAST_LIST_INITIAL_STATE, action) => {
    console.log(JSON.stringify(action))

    switch(action.type) {
        case REFRESH_PODCAST_LIST:
            return action.payload.newPodcastList;
        default:
            return state;
    }
};