import { combineReducers } from 'redux';

import { podcastListReducer, podcastDownloadReducer } from './podcastListReducer';
import { selectedProgramReducer } from './programReducer';

export default combineReducers({
    selectedProgramId: selectedProgramReducer,
    podcastList: podcastListReducer,
    download: podcastDownloadReducer
});