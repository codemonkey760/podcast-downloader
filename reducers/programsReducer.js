import { NamingMode } from '../Util/Namer'

const initialState = {
    20635765: {
        name: "John and Ken Show",
        namingMode: NamingMode.TITLE_REGEX,
        titleRegex: "^John & Ken Show Hour (\\d+) \\((\\d+)/(\\d+)\\)$",
        fileNamePattern: "jk-$2$3-hr$1"
    },
    27202021: {
        name: "Carl DeMaio Show",
        namingMode: NamingMode.NONE
    },
    30021205: {
        name: "Red Pilled America",
        namingMode: NamingMode.NONE
    },
    27538440: {
        name: "Wendy Walsh Show",
        namingMode: NamingMode.TITLE_REGEX,
        titleRegex: "^@DrWendyWalsh \\((\\d+)/(\\d+)\\) Hour (\\d+)$",
        fileNamePattern: "ww-$1$2-hr$3"
    },
    27401728: {
        name: "Gary and Shannon Show",
        namingMode: NamingMode.NONE
    },
    20635767: {
        name: "The Conway Show",
        namingMode: NamingMode.NONE
    }
}

export const programsReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};
