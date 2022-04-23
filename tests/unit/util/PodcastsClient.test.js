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

            assert.isAtLeast(axiosPost.args[0].length, 2, 'post call supplies data to endpoint');

            const data = axiosPost.args[0][1];
            assert.equal(data.hostName, 'webapp.US', 'post call supplies data to endpoint');
            assert.equal(data.playedFrom, '514', 'post call supplies data to endpoint');
            assert.equal(data.stationId, '20635765', 'post call supplies data to endpoint');
            assert.equal(data.stationType, 'PODCAST', 'post call supplies data to endpoint');
        });

        it('supplies multiple podcast ids to endpoint', async () => {
            const podcast_ids = [1, 2, 3];
            configureAxiosToReturnGoodResponse(axiosPost);

            await getPodcastDetails(podcast_ids, getCredentials());

            assert.isAtLeast(axiosPost.args[0].length, 2, 'post call supplies data to endpoint');

            const data = axiosPost.args[0][1];
            assert.equal(data.contentIds, podcast_ids, 'post call supplies data to endpoint');
        });

        it('supplies a single podcast id to endpoint', async () => {
            const podcast_id = faker.datatype.number();
            configureAxiosToReturnGoodResponse(axiosPost);

            await getPodcastDetails(podcast_id, getCredentials());

            const data = axiosPost.args[0][1];
            assert.deepEqual(data.contentIds, [podcast_id], 'post call supplies podcast id to endpoint as array');
        });

        it ('throws exception when given empty array for podcast ids', async () => {
            let caughtException = null;
            try {
                await getPodcastDetails([], {});
            } catch (error) {
                caughtException = error;
            }

            assert.isNotNull(caughtException, 'throws exception when given empty array');
        });

        it('throws exception when receiving http error from endpoint', async () => {
            configureAxiosToReturnBadResponse(axiosPost);

            let caughtException = null;
            try {
                await getPodcastDetails([1, 2, 3], getCredentials());
            } catch (error) {
                caughtException = error;
            }

            assert.isNotNull(caughtException, 'throws exception when receiving http error');
        });

        it('returns data when successful', async () => {
            const data = {
                key1: 'value1',
                key2: 'value2'
            };
            configureAxiosToReturnGoodResponse(axiosPost, data);

            const details = await getPodcastDetails([1, 2, 3], getCredentials());

            assert.deepEqual(details, data, 'returns data when successful');
        });
    });
});
