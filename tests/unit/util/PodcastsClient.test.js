import faker from '@faker-js/faker'

import axios from 'axios'
jest.mock('axios')

import { getProgramPodcasts, getPodcastDetails } from '../../../Util/PodcastClient'

function getCredentials(sessionId = null, profileId = null) {
    if (sessionId === null) {
        sessionId = faker.datatype.string(9);
    }
    if (profileId === null) {
        profileId = faker.datatype.string(9);
    }

    return {
        sessionId,
        profileId
    };
}

function configureAxiosToReturnGoodResponse(axios, data = {}) {
    const response = {
        status: 200,
        statusText: 'OK',
        data
    };

    axios.mockResolvedValue(response);
}

function configureAxiosToReturnBadResponse(axios) {
    const response = {
        status: 400,
        statusText: 'Bad Request'
    };

    axios.mockResolvedValue(response);
}

describe('PodcastsClientUnitTest', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getProgramPodcasts', () => {
        it('makes one get request to iheart podcasts endpoint',  async () => {
            const program_id = faker.datatype.number();
            const limit = faker.datatype.number();
            const expected_url = `https://us.api.iheart.com/api/v3/podcast/podcasts/${program_id}/episodes`
            configureAxiosToReturnGoodResponse(axios.get, []);

            await getProgramPodcasts(program_id, limit);

            expect(axios.get.mock.calls.length).toBe(1)
            expect(axios.get.mock.calls[0].length).toBeGreaterThanOrEqual(1)
            expect(axios.get.mock.calls[0][0]).toBe(expected_url)
        });

        it('supplies the limit as a query param', async () => {
            const program_id = faker.datatype.number();
            const limit = faker.datatype.number();
            configureAxiosToReturnGoodResponse(axios.get, []);

            await getProgramPodcasts(program_id, limit);

            expect(axios.get.mock.calls.length).toBe(1)
            expect(axios.get.mock.calls[0].length).toBeGreaterThanOrEqual(2)
            expect(axios.get.mock.calls[0][1]).toBeInstanceOf(Object)
            expect(axios.get.mock.calls[0][1]).toHaveProperty('params')
            expect(axios.get.mock.calls[0][1].params).toHaveProperty('limit')
            expect(axios.get.mock.calls[0][1].params.limit).toBe(limit)
        });

        it('throws exception when response code indicates an http error', async () => {
            configureAxiosToReturnBadResponse(axios.get)

            let caughtError = null;
            try {
                await getProgramPodcasts('some_program_id', 1);
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).not.toBeNull()
        });

        it('returns the json response when successful', async () => {
            const fakeData = [1,2,3];
            configureAxiosToReturnGoodResponse(axios.get, {data: fakeData})

            const podcasts = await getProgramPodcasts('some_program_id', 1);

            expect(podcasts).toBeInstanceOf(Array)
            expect(podcasts).toStrictEqual(fakeData)
        });
    });

    describe('getPodcastDetails', () => {
        it('makes one post request to iheart streams endpoint', async () => {
            // TODO: make this configurable rather than hard-coded
            const expected_url = 'https://us.api.iheart.com/api/v2/playback/streams';
            configureAxiosToReturnGoodResponse(axios.post);

            await getPodcastDetails([1,2,3], getCredentials());

            expect(axios.post.mock.calls.length).toBe(1)
            expect(axios.post.mock.calls[0].length).toBeGreaterThanOrEqual(1)
            expect(axios.post.mock.calls[0][0]).toBe(expected_url)
        });

        it('identifies itself with credentials', async () => {
            const sessionId = faker.datatype.string(9);
            const profileId = faker.datatype.string(9);
            configureAxiosToReturnGoodResponse(axios.post);

            await getPodcastDetails([1,2,3], getCredentials(sessionId, profileId));

            expect(axios.post.mock.calls.length).toBe(1)
            expect(axios.post.mock.calls[0].length).toBeGreaterThanOrEqual(3)
            expect(axios.post.mock.calls[0][2]).toHaveProperty('headers')
            expect(axios.post.mock.calls[0][2].headers).toHaveProperty('X-Session-Id')
            expect(axios.post.mock.calls[0][2].headers['X-Session-Id']).toBe(sessionId)
            expect(axios.post.mock.calls[0][2].headers).toHaveProperty('X-User-Id')
            expect(axios.post.mock.calls[0][2].headers['X-User-Id']).toBe(profileId)
        });

        it('supplies data to endpoint', async () => {
            configureAxiosToReturnGoodResponse(axios.post);

            await getPodcastDetails([1,2,3], getCredentials());

            expect(axios.post.mock.calls.length).toBe(1)
            expect(axios.post.mock.calls[0].length).toBeGreaterThanOrEqual(2)
            expect(axios.post.mock.calls[0][1]).toBeInstanceOf(Object)

            const data = axios.post.mock.calls[0][1]
            expect(data).toHaveProperty('hostName')
            expect(data['hostName']).toBe('webapp.US')
            expect(data).toHaveProperty('playedFrom')
            expect(data['playedFrom']).toBe('514')
            expect(data).toHaveProperty('stationId')
            expect(data['stationId']).toBe('20635765')
            expect(data).toHaveProperty('stationType')
            expect(data['stationType']).toBe('PODCAST')
        });

        it('supplies multiple podcast ids to endpoint', async () => {
            const podcast_ids = [1, 2, 3];
            configureAxiosToReturnGoodResponse(axios.post);

            await getPodcastDetails(podcast_ids, getCredentials());

            expect(axios.post.mock.calls.length).toBe(1)
            expect(axios.post.mock.calls[0].length).toBeGreaterThanOrEqual(2)

            const data = axios.post.mock.calls[0][1]
            expect(data).toHaveProperty('contentIds')
            expect(data.contentIds).toBe(podcast_ids);
        });

        it('supplies a single podcast id to endpoint', async () => {
            const podcast_id = faker.datatype.number();
            configureAxiosToReturnGoodResponse(axios.post);

            await getPodcastDetails(podcast_id, getCredentials());

            expect(axios.post.mock.calls.length).toBe(1)
            expect(axios.post.mock.calls[0].length).toBeGreaterThanOrEqual(2)

            const data = axios.post.mock.calls[0][1]
            expect(data).toHaveProperty('contentIds')
            expect(data.contentIds).toStrictEqual([podcast_id])
        });

        it ('throws exception when given empty array for podcast ids', async () => {
            let caughtException = null;
            try {
                await getPodcastDetails([], {});
            } catch (error) {
                caughtException = error;
            }

            expect(caughtException).not.toBeNull()
        });

        it('throws exception when receiving http error from endpoint', async () => {
            configureAxiosToReturnBadResponse(axios.post);

            let caughtException = null;
            try {
                await getPodcastDetails([1, 2, 3], getCredentials());
            } catch (error) {
                caughtException = error;
            }

            expect(caughtException).not.toBeNull()
        });

        it('returns data when successful', async () => {
            const data = {
                key1: 'value1',
                key2: 'value2'
            };
            configureAxiosToReturnGoodResponse(axios.post, data);

            const details = await getPodcastDetails([1, 2, 3], getCredentials());

            expect(details).toStrictEqual(data)
        });
    });
});
