import { getProgramPodcasts, getPodcastDetails } from '../../../Util/PodcastClient'
jest.mock('../../../Util/PodcastClient', () => {
    return {
        getProgramPodcasts: jest.fn(),
        getPodcastDetails: jest.fn()
    }
})

import { getPodcastsForProgram } from '../../../Helpers/PodcastHelper'

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
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('getPodcastsForProgram', () => {
        const programIdMock = 777;
        const limitMock = 42;

        it('uses the podcasts client to fetch podcasts', async () => {
            getProgramPodcasts.mockResolvedValue(getRawPayload())
            await getPodcastsForProgram(programIdMock, limitMock)

            expect(getProgramPodcasts.mock.calls.length).toBe(1)
            const getProgramPodcastsCall = getProgramPodcasts.mock.calls[0]

            expect(getProgramPodcastsCall.length).toBeGreaterThanOrEqual(2)
            expect(getProgramPodcastsCall[0]).toBe(programIdMock)
            expect(getProgramPodcastsCall[1]).toBe(limitMock)
        });

        it('reduces the response', async () => {
            getProgramPodcasts.mockResolvedValue(getRawPayload())
            const reducedPayload = getReducedPayload()

            const response = await getPodcastsForProgram(programIdMock, limitMock)

            expect(response).toStrictEqual(reducedPayload)
        });

        it('returns empty array when no results fetched', async () => {
            getProgramPodcasts.mockResolvedValue([])

            const result = await getPodcastsForProgram(programIdMock, limitMock);

            expect(result).toStrictEqual([])
        });
    });
});