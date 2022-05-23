import { combineReducers } from 'redux';

import { programsReducer } from './programsReducer';

export default combineReducers({
    programs: programsReducer,
});
