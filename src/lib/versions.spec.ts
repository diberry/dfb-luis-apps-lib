import { LuisAppVersions, ILuisAppVersion } from '../index';
import { IValues, ILuisModel } from './interfaces';
import { MockData } from '../mockData/index';

jest.mock('./models');
import { LuisAppVersionModels } from './models';

jest.mock('./httpRequest', () => ({
  request: jest.fn(() => {
    return Promise.resolve(MockData.Versions);
  }),
}));

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const real_endpoint = 'https://westus.api.cognitiveservices.azure.com/';
const real_appId = 'e81bd25c-41c7-4ff1-8f8a-de2ad3f29f3c';

const mockLuisAppVersionModelsGetModels = jest.spyOn(LuisAppVersionModels, 'getModels');
mockLuisAppVersionModelsGetModels.mockResolvedValue(<ILuisModel[]>MockData.Models);

describe('LUIS Versions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    mockLuisAppVersionModelsGetModels.mockClear();
  });

  describe('returns 2xx', () => {
    it('if correct key, then get versions', async done => {
      try {
        const values: IValues = {
          endpoint: real_endpoint,
          key: fake_key,
          appId: real_appId,
        };
        const featureFlags = {
          versions: true,
          models: false,
        };

        const versions: any = await LuisAppVersions.getVersions(values, featureFlags);
        const typedObject: ILuisAppVersion[] = <ILuisAppVersion[]>versions;
        expect(typedObject[0].version).toBe('mock0.1');
        expect(LuisAppVersionModels.getModels).toHaveBeenCalledTimes(0);
        expect(typedObject[0]).not.toHaveProperty('models');

        done();
      } catch (err) {
        done(err);
      }
    });
  });
  it('if correct key, then get versions and models', async done => {
    try {
      const values: IValues = {
        endpoint: real_endpoint,
        key: fake_key,
        appId: real_appId,
      };
      const featureFlags = {
        versions: true,
        models: true,
      };

      const versions: any = await LuisAppVersions.getVersions(values, featureFlags);
      const typedObject: ILuisAppVersion[] = <ILuisAppVersion[]>versions;
      expect(typedObject[0].version).toBe('mock0.1');
      expect(typedObject[0]).toHaveProperty('models');
      expect(LuisAppVersionModels.getModels).toHaveBeenCalledTimes(4);

      // @ts-ignore
      expect(typedObject[0].models[0].name).toEqual('mockCancelOrder');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('throw errors', () => {
  it('if empty key, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: real_endpoint,
        key: undefined,
      };

      const versions: any = await LuisAppVersions.getVersions(values);

      done(`didn't throw error but expected one, versions length ${versions.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getVersions - invalid parameter `key`');
      done();
    }
  });
  it('if empty endpoint, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: undefined,
        key: fake_key,
      };

      const versions: any = await LuisAppVersions.getVersions(values);

      done(`didn't throw error but expected one, versions length ${versions.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getVersions - invalid parameter `endpoint`');
      done();
    }
  });
  it('if undefined values, then throw error', async done => {
    try {
      // @ts-ignore
      const values = undefined;

      // @ts-ignore
      const versions: any = await LuisAppVersions.getVersions(values);

      done(`didn't throw error but expected one, versions length ${versions.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getVersions - values: IValues is empty');
      done();
    }
  });
  it('if empty values array, then throw error', async done => {
    try {
      const values = [];

      const versions: any = await LuisAppVersions.getVersions(values);

      done(`didn't throw error but expected one, versions length ${versions.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(`dfb-luis-apps-lib::getVersions - values: IValues is empty`);
      done();
    }
  });
});
