import { LuisApps, ILuisApp } from '../index';
import { IValues } from './interfaces';

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const real_endpoint = "https://diberry-lang-understanding-west-us-2.cognitiveservices.azure.com/";

describe('LUIS', () => {
  describe('returns 2xx', () => {
    it('if correct key, then get apps', async (done) => {
      try {

        const values: IValues = {
          "endpoint": real_endpoint,
          "key": fake_key
        };

        const apps: any = await LuisApps.getApps(values);
        const typedObject: ILuisApp[] = <ILuisApp[]>apps;
        expect(typedObject[0].name).toBe("Mock Hazem's Pizza App 2");
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
describe('throw errors', () => {
  it('if empty key, then throw error', async (done) => {
    try {
      const values: IValues = {
        "endpoint": real_endpoint,
        "key": undefined
      };

      const apps: any = await LuisApps.getApps(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getApps - invalid parameter `key`');
      done();
    }
  });
  it('if empty endpoint, then throw error', async (done) => {
    try {
      const values: IValues = {
        "endpoint": undefined,
        "key": fake_key
      };

      const apps: any = await LuisApps.getApps(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getApps - invalid parameter `endpoint`');
      done();
    }
  });  
});

