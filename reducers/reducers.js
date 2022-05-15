import { combineReducers } from 'redux';

import { podcastListReducer } from './podcastListReducer';
import { selectedProgramReducer } from './programReducer';

export default combineReducers({
    selectedProgramId: selectedProgramReducer,
    podcastList: podcastListReducer,
});