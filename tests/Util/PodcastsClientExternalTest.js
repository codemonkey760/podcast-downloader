const {assert} = require('chai');
const {getProgramPodcasts} = require('../../Util/PodcastClient');

const programIdForTest = '20635765'; // The John and Ken show

describe('PodcastsClientExternalTest', async () => {
    describe('getProgramPodcasts', () => {
        it('doesnt throw exceptions', async () => {
            let caughtError = null;
            try {
                await getProgramPodcasts(programIdForTest, 1);
            } catch (error) {
                caughtError = error;
            }

            assert.isNull(caughtError, 'getProgramPodcasts doesnt throw exceptions when properly used');
        });

        it('works', async () => {
            let podcasts = await getProgramPodcasts(programIdForTest, 1);

            console.log(JSON.stringify(podcasts[0]));
        });
    });
});
