import { Apps, IApp }  from '../src/index';
require('dotenv').config();

describe('TextAnalytics', () => {

    it('should detect language', async (done) => {

        try {

            const apps: any = await Apps.getApps(process.env.LUIS_AUTHORING_KEY);
            const typedObject: IApp[] = <IApp[]> apps;
            console.log(typedObject[0].name);
            expect(typedObject[0].name).toBe("Hazem/'s Pizza App 2");
            done();

        } catch (err) {
            done(err)
        }
    });
});
