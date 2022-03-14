const {createUser} = require('../../Util/AuthClient');
const {getProgramPodcasts, getPodcastDetails} = require('../../Util/PodcastClient');

const programIdForTest = '20635765'; // The John and Ken show

describe('PodcastsClientExternalTest', async () => {
    describe('getProgramPodcasts', () => {
        it('works', async () => {
            let podcasts = await getProgramPodcasts(programIdForTest, 1);

            console.log(JSON.stringify(podcasts[0]));
        });
    });

    describe('getPodcastDetails', () => {
        it('works', async () => {
            const user = await createUser();
            const credentials = {
                sessionId: user.sessionId,
                profileId: user.profileId
            }
            const podcasts = await getProgramPodcasts(programIdForTest, 1);

            const details = await getPodcastDetails(podcasts[0]['id'], credentials);

            console.log(details);
        });
    });
});
