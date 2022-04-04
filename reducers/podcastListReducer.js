import { REFRESH_PODCAST_LIST } from '../actions/podcastListActions';

const INITIAL_STATE = {};

export const podcastListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REFRESH_PODCAST_LIST:
            const newState = {
                ...state
            };
            newState[action.payload.programId] = action.payload.newPodcastList;

            return newState;
        default:
            return state
    }
};