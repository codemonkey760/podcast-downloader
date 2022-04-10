export const REFRESH_PODCAST_LIST = 'REFRESH_PODCAST_LIST';
export const START_PODCAST_DOWNLOAD = 'START_PODCAST_DOWNLOAD';
export const UPDATE_PODCAST_DOWNLOAD = 'UPDATE_PODCAST_DOWNLOAD';
export const FINISH_PODCAST_DOWNLOAD = 'FINISH_PODCAST_DOWNLOAD';

export const refreshPodcastList = (programId, newPodcastList) => (
    {
        type: REFRESH_PODCAST_LIST,
        payload: { programId, newPodcastList }
    }
);

export const startPodcastDownload = (podcastId) => (
    {
        type: START_PODCAST_DOWNLOAD,
        payload: { podcastId }
    }
);

export const updatePodcastDownload = (podcastId, progress) => (
    {
        type: UPDATE_PODCAST_DOWNLOAD,
        payload: { podcastId, progress }
    }
);

export const finishPodcastDownload = (podcastId) => (
    {
        type: FINISH_PODCAST_DOWNLOAD,
        payload: { podcastId }
    }
);