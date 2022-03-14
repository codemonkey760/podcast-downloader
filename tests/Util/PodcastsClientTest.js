const sinon = require('sinon');
const {assert} = require('chai');
const {faker} = require('@faker-js/faker');

const axios = require('axios');

const {
    getProgramPodcasts,
    getPodcastDetails
} = require('../../Util/PodcastClient')

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

    axios.resolves(response);
}

function configureAxiosToReturnBadResponse(axios) {
    const response = {
        status: 400,
        statusText: 'Bad Request'
    };

    axios.resolves(response);
}

describe('PodcastsClientUnitTest', () => {
    describe('getProgramPodcasts', () => {
        let axiosGet;

        beforeEach(() => {
            axiosGet = sinon.stub(axios, 'get');
        });

        afterEach(() => {
            axiosGet.restore();
        });

        it('makes get request to iheart podcasts endpoint',  async () => {
            const program_id = faker.datatype.number();
            const expected_url = `https://us.api.iheart.com/api/v3/podcast/podcasts/${program_id}/episodes`
            axiosGet.resolves({
                status: 200,
                statusText: 'OK',
                data: []
            });

            await getProgramPodcasts(program_id, 1);

            assert.isTrue(axiosGet.calledOnce, 'makes only one get call');
            assert.isAtLeast(axiosGet.args[0].length, 1, 'get call has at least one argument');
            assert.equal(axiosGet.args[0][0], expected_url, 'makes get call to iheart podcasts endpoint for program');
        });

        it('supplies the limit as a query param', async () => {
            const limit = faker.datatype.number();
            axiosGet.resolves({
                status: 200,
                statusText: 'OK',
                data: [],
            });

            await getProgramPodcasts('some_program_id', limit);

            assert.isAtLeast(axiosGet.args[0].length, 2, 'get call supplies config parameter');
            assert.isObject(axiosGet.args[0][1], 'get call supplies object as config parameter');
            assert.exists(axiosGet.args[0][1].params, 'config parameters contains query params');

            const params = axiosGet.args[0][1].params;
            assert.equal(params['limit'], limit, 'get call supplies limit as query param');
        });

        it('throws exception when response code indicates an http error', async () => {
            axiosGet.resolves({
                status: 400,
                statusText: 'Bad request'
            });

            let caughtError = null;
            try {
                await getProgramPodcasts('some_program_id', 1);
            } catch (error) {
                caughtError = error;
            }

            assert.isNotNull(caughtError);
        });

        it('returns the json response when successful', async () => {
            const fakeData = [1,2,3];
            axiosGet.resolves({
                status: 200,
                statusText: 'OK',
                data: {
                    data: fakeData
                }
            });

            const podcasts = await getProgramPodcasts('some_program_id', 1);

            assert.equal(podcasts, fakeData, 'getProgramPodcasts returns data when successful');
        });
    });

    describe('getPodcastDetails', () => {
        let axiosPost;

        beforeEach(() => {
            axiosPost = sinon.stub(axios, 'post');
        });

        afterEach(() => {
            axiosPost.restore();
        });

        it('makes post request to iheart streams endpoint', async () => {
            const expected_url = 'https://us.api.iheart.com/api/v2/playback/streams';
            configureAxiosToReturnGoodResponse(axiosPost);

            await getPodcastDetails([1,2,3], getCredentials());

            assert.isTrue(axiosPost.calledOnce, 'makes only one post request');
            assert.isAtLeast(axiosPost.args[0].length, 1, 'supplies url to post call');
            assert.equal(axiosPost.args[0][0], expected_url, 'makes post call to iheart steams url');
        });

        it('identifies itself with credentials', async () => {
            const sessionId = faker.datatype.string(9);
            const profileId = faker.datatype.string(9);
            configureAxiosToReturnGoodResponse(axiosPost);

            await getPodcastDetails([1,2,3], getCredentials(sessionId, profileId));

            assert.isAtLeast(axiosPost.args[0].length, 3, 'post call supplies config parameter');
            assert.exists(axiosPost.args[0][2].headers, 'post call supplies headers in config');

            const headers = axiosPost.args[0][2].headers;
            assert.equal(headers['X-Session-Id'], sessionId, 'post call supplies session id');
            assert.equal(headers['X-User-Id'], profileId, 'post call supplies profile id via user id header');
        });

        it('supplies data to endpoint', async () => {
            configureAxiosToReturnGoodResponse(axiosPost);

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
