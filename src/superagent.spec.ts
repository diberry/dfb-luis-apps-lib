import { request } from './lib/httpRequest';
require('dotenv').config()

describe('LIVE - LUIS Apps', () => {
    it('if correct key, then get apps', async done => {
        try {
            const options = {
                'url': `${process.env.LUIS_ENDPOINT}luis/authoring/v3.0-preview/apps`,
                'method': "get",
                'headers': {
                    'Ocp-Apim-Subscription-Key': process.env.LUIS_ENDPOINT_KEY
                }
            };

            const response = await request(options);

            expect(Array.isArray(response)).toBe(true);
            done();
        } catch (ex) {
            done(`${ex.message}`);
        }
    })
})
