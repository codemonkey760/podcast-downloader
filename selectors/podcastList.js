export const getPodcastList = (state) => {
    return state.podcastList
}

export const getPodcast = (state, id) => {
    return state.podcastList[id] ?? {}
}