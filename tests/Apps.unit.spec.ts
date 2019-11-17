import { Apps, IApp }  from '../src/index';
require('dotenv').config();

describe('LUIS', () => {

    it('should get apps', async (done) => {

        try {

            const apps: any = await Apps.getApps(process.env.LUIS_AUTHORING_KEY);
            const typedObject: IApp[] = <IApp[]> apps;
            expect(typedObject[0].name).toBe("Hazem's Pizza App 2");
            done();

        } catch (err) {
            done(err)
        }
    });
});
