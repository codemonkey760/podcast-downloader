import { NamingMode } from '../Util/Namer'

const initialState = {
    20635765: {
        name: "John and Ken Show",
        namingMode: NamingMode.TITLE_REGEX
    }
}

export const programsReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};
