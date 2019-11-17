import { LuisApps, ILuisApp }  from '../src/index';
require('dotenv').config();

describe('LUIS', () => {

    it('should get apps', async (done) => {

        try {

            const apps: any = await LuisApps.getApps(process.env.LUIS_AUTHORING_KEY);
            const typedObject: ILuisApp[] = <ILuisApp[]> apps;
            expect(typedObject[0].name).toBe("Hazem's Pizza App 2");
            done();

        } catch (err) {
            done(err)
        }
    });
});
