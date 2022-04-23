import { createUser } from '../../../Util/AuthClient'

describe('AuthClientExternalTests', () => {
    jest.setTimeout(30000)

    describe('createUser', () => {
        it ('does not throw exception', async () => {
            let caughtError = null;

            try {
                await createUser();
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toBeNull()
        });

        it('returns credentials', async () => {
            const credentials = await createUser();

            expect(credentials).toHaveProperty('sessionId')
            expect(credentials.sessionId).toBeDefined()

            expect(credentials).toHaveProperty('profileId')
            expect(credentials.profileId).toBeDefined()

            console.log(JSON.stringify(credentials))
        });
    });
});
