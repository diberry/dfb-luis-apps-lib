import { MockData } from '../mockData/index';

jest.mock('./versions');
jest.mock('./models');

import { LuisApps, ILuisApp } from '../index';
import { IValues, ILuisAppVersion, IFeatureFlags } from './interfaces';
import { LuisAppVersions } from './versions';
import { LuisAppVersionModels } from './models';

// MOCKS
const mockRequest = require('request-promise');
const mockLuisAppVersionsGetVersions = jest.spyOn(LuisAppVersions, 'getVersions');
mockLuisAppVersionsGetVersions.mockResolvedValue(<ILuisAppVersion[]>MockData.Versions);

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const real_endpoint = 'https://diberry-lang-understanding-west-us-2.cognitiveservices.azure.com/';

describe('LUIS Apps', () => {
  beforeEach(() => {
    mockRequest.mockImplementationOnce(() => Promise.resolve(JSON.stringify(MockData.Apps)));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    mockLuisAppVersionsGetVersions.mockClear();
  });

  describe('returns 2xx', () => {
    it('if correct key, then get apps', async done => {
      try {
        const values: IValues = {
          endpoint: real_endpoint,
          key: fake_key,
        };
        const features: IFeatureFlags = {
          versions: false,
          models: false,
        };

        const apps: any = await LuisApps.getApps(values, features);
        const typedObject: ILuisApp[] = <ILuisApp[]>apps;

        expect(typedObject[0].name).toBe("Mock Hazem's Pizza App 2");
        expect(typedObject[0]).not.toHaveProperty('versions');
        expect(LuisAppVersions.getVersions).toHaveBeenCalledTimes(0);
        expect(LuisAppVersionModels.getModels).toHaveBeenCalledTimes(0);

        done();
      } catch (err) {
        done(err);
      }
    });
    it('if correct values and featureFlag, then get apps and versions', async done => {
      try {
        const values: IValues = {
          endpoint: real_endpoint,
          key: fake_key,
        };
        const features: IFeatureFlags = {
          versions: true,
          models: false,
        };

        const apps: any = await LuisApps.getApps(values, features);
        const typedObject: ILuisApp[] = <ILuisApp[]>apps;

        expect(typedObject[0].name).toBe("Mock Hazem's Pizza App 2");
        expect(typedObject[0]).toHaveProperty('versions');
        expect(LuisAppVersions.getVersions).toHaveBeenCalledTimes(apps.length);
        expect(LuisAppVersionModels.getModels).toHaveBeenCalledTimes(0);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
describe('throw errors', () => {
  it('if empty key, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: real_endpoint,
        key: undefined,
      };
      const features: IFeatureFlags = {
        versions: true,
        models: false,
      };

      const apps: any = await LuisApps.getApps(values, features);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getApps - invalid parameter `key`');
      done();
    }
  });
  it('if empty endpoint, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: undefined,
        key: fake_key,
      };
      const features: IFeatureFlags = {
        versions: true,
        models: false,
      };

      const apps: any = await LuisApps.getApps(values, features);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getApps - invalid parameter `endpoint`');
      done();
    }
  });
  it('if undefined values, then throw error', async done => {
    try {
      // @ts-ignore
      const values = undefined;

      const features: IFeatureFlags = {
        versions: true,
        models: true,
      };

      // @ts-ignore
      const apps: any = await LuisApps.getApps(values, features);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getApps values is empty');
      done();
    }
  });
  it('if empty values array, then throw error', async done => {
    try {
      const values = [];
      const features: IFeatureFlags = {
        versions: true,
        models: true,
      };
      const apps: any = await LuisApps.getApps(values, features);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(`dfb-luis-apps-lib::getApps values is empty`);
      done();
    }
  });
});
