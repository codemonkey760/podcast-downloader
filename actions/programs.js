export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'

export const updateProgram = (id, name, namingMode, titleRegex, fileNamePattern) => {
    return {
        type: UPDATE_PROGRAM,
        payload: {
            id,
            name,
            namingMode,
            titleRegex,
            fileNamePattern,
        }
    }
}