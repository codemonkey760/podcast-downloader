export const getPodcastListForProgram = (state, programId) => {
    return (state.podcastList[programId]) ? state.podcastList[programId] : [];
}