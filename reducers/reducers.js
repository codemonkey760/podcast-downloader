import { combineReducers } from 'redux';

import { selectedProgramReducer } from './programReducer';

export default combineReducers({
    selectedProgramId: selectedProgramReducer,
});