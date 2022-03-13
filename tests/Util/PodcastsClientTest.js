const sinon = require('sinon');
const {assert} = require('chai');
const {faker} = require('@faker-js/faker');

const axios = require('axios');

const {getProgramPodcasts} = require('../../Util/PodcastClient')

describe('PodcastsClientUnitTest', async () => {
    let axiosGet;

    beforeEach(() => {
        axiosGet = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        axiosGet.restore();
    });

    describe('getProgramPodcasts', () => {
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
});

// https://us.api.iheart.com/api/v3/podcast/podcasts/{}/episodes
