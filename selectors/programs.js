export const getProgramsList = (state) => {
    return (state.programs) ?? {}
}

export const getProgram = (state, id) => {
    return (state.programs[id]) ?? null
}