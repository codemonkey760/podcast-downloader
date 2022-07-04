import { getPodcastsForProgram } from '../../../Helpers/PodcastHelper'

const programIdForTest = '20635765'; // The John and Ken show

describe('getPodcastsForProgram', () => {
    it('works', async () => {
        jest.setTimeout(0)

        const podcastList = await getPodcastsForProgram(programIdForTest, 4)

        console.log(JSON.stringify(podcastList))
    })
})