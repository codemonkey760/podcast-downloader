import { createUser } from '../../../Util/AuthClient'
import { getProgramPodcasts, getPodcastDetails } from '../../../Util/PodcastClient'

const programIdForTest = '20635765'; // The John and Ken show

describe('PodcastsClientExternalTest', () => {
    describe('getProgramPodcasts', () => {
        it('works', async () => {
            let caughtError = null
            try {
                const podcasts = await getProgramPodcasts(programIdForTest, 1)

                console.log(JSON.stringify(podcasts[0]))
            } catch (e) {
                caughtError = e
            }

            expect(caughtError).toBeNull()
        });
    });

    describe('getPodcastDetails', () => {
        it('works', async () => {
            const user = await createUser()
            const credentials = {
                sessionId: user.sessionId,
                profileId: user.profileId
            }

            const podcasts = await getProgramPodcasts(programIdForTest, 1)

            let caughtError = null
            try {
                const details = await getPodcastDetails(podcasts[0]['id'], credentials)

                console.log(JSON.stringify(details))
            } catch (e) {
                caughtError = e
            }

            expect(caughtError).toBeNull()
        });
    });
});
