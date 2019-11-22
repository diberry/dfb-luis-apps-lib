import { LuisApps, ILuisApp } from '../index';

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

describe('LUIS', () => {
  it('if correct key, should get apps', async done => {
    try {
      const apps: any = await LuisApps.getApps(fake_key);
      const typedObject: ILuisApp[] = <ILuisApp[]>apps;
      expect(typedObject[0].name).toBe("Mock Hazem's Pizza App 2");
      done();
    } catch (err) {
      done(err);
    }
  });
  it('if empty key, should throw error', async done => {
    try {
      const emptyKey = undefined;
      const apps: any = await LuisApps.getApps(emptyKey);
      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('invalid parameter `key`');
      done();
    }
  });
});
