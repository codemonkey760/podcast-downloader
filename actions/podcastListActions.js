export const REFRESH_PODCAST_LIST = 'REFRESH_PODCAST_LIST';

export const refreshPodcastList = (programId, newPodcastList) => (
    {
        type: REFRESH_PODCAST_LIST,
        payload: {programId, newPodcastList}
    }
);