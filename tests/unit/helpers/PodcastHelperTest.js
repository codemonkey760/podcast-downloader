const sinon = require('sinon');
const { assert } = require('chai');

const podcastClient = require('../../../Util/PodcastClient');

const { getPodcastsForProgram } = require('../../../Helpers/PodcastHelper');

function getRawPayload() {
    return [
        {
            'id': 123,
            'podcastId': 456,
            'podcastSlug': 'asdasd',
            'title': 'title1',
            'duration': 123123,
            'isExplicit': true,
            'isInteractive': true,
            'description': 'description1',
            'startDate': 1648857956000,
            'imageUrl': 'https://example.com/1.jpg',
        },
        {
            'id': 321,
            'podcastId': 654,
            'podcastSlug': 'asd',
            'title': 'title2',
            'duration': 321321,
            'isExplicit': false,
            'isInteractive': false,
            'description': 'description2',
            'startDate': 1648857956000,
            'imageUrl': 'https://example.com/2.jpg',
        },
    ];
}

function getReducedPayload() {
    return [
        {
            'id': 123,
            'title': 'title1',
            'startDate': 1648857956000,
            'imageUrl': 'https://example.com/1.jpg'
        },
        {
            'id': 321,
            'title': 'title2',
            'startDate': 1648857956000,
            'imageUrl': 'https://example.com/2.jpg'
        },
    ];
}

describe('Podcast Helper unit tests', () => {
    describe('getPodcastsForProgram', () => {
        let getProgramPodcastsMock;
        const programIdMock = 777;
        const limitMock = 42;

        beforeEach(() => {
            getProgramPodcastsMock = sinon.stub(podcastClient, 'getProgramPodcasts');
        });

        afterEach(() => {
            getProgramPodcastsMock.restore();
        });

        it('uses the podcasts client to fetch podcasts', async () => {
            getProgramPodcastsMock.resolves(getRawPayload());
            await getPodcastsForProgram(programIdMock, limitMock);

            assert.isTrue(getProgramPodcastsMock.calledOnce, 'makes only one call to getProgramPodcasts');
            assert.isAtLeast(getProgramPodcastsMock.args[0].length, 1, 'supplies a value for programId');
            assert.equal(getProgramPodcastsMock.args[0][0], programIdMock, 'supplies the program id');
            assert.isAtLeast(getProgramPodcastsMock.args[0].length, 2, 'supplies a value for limit');
            assert.equal(getProgramPodcastsMock.args[0][1], limitMock, 'supplies the limit');
        });

        it('reduces the response', async () => {
            getProgramPodcastsMock.resolves(getRawPayload());
            const reducedPayload = getReducedPayload();

            const response = await getPodcastsForProgram(programIdMock, limitMock);

            assert.deepEqual(response, reducedPayload, 'returns the reduced response');
        });

        it('returns empty array when no results fetched', async () => {
            getProgramPodcastsMock.resolves([]);

            const result = await getPodcastsForProgram(programIdMock, limitMock);

            assert.deepEqual(result, [], 'returns empty array');
        });
    });
});