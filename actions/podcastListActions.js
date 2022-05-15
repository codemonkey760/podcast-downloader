export const REFRESH_PODCAST_LIST = 'REFRESH_PODCAST_LIST';

export const refreshPodcastList = (newPodcastList) => (
    {
        type: REFRESH_PODCAST_LIST,
        payload: { newPodcastList }
    }
);