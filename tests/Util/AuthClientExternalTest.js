const { assert } = require('chai')
const { createUser } = require('../../Util/AuthClient');

describe('AuthClientExternalTests', async () => {
    describe('createUser', async () => {
        it ('does not throw exception', async () => {
            let caughtError = null;

            try {
                await createUser();
            } catch (error) {
                caughtError = error;
            }

            assert.isNull(caughtError, 'createUser does not throw exceptions');
        });

        it('returns credentials', async () => {
            let creds = await createUser();

            assert.exists(creds.sessionId, 'Return contains a session id');
            assert.exists(creds.profileId, 'Return contains a profile id');
        });
    });
});
