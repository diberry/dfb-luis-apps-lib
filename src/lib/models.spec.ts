import { LuisAppVersionModels } from '../index';
import { IValues, ILuisModel } from './interfaces';
import { MockData } from '../mockData/index';

jest.mock('./httpRequest', () => ({
  request: jest.fn(() => { return Promise.resolve(MockData.Models); }
)}));

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const real_endpoint = 'https://westus.api.cognitiveservices.azure.com/';
const real_appId = 'e81bd25c-41c7-4ff1-8f8a-de2ad3f29f3c';
const real_versionId = '0.4';

describe('LUIS Models', () => {

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('returns 2xx', () => {
    it('if correct key, then get apps', async done => {
      try {
        const values: IValues = {
          endpoint: real_endpoint,
          key: fake_key,
          appId: real_appId,
          versionId: real_versionId,
        };

        const models: any = await LuisAppVersionModels.getModels(values);

        const typedObject: ILuisModel[] = <ILuisModel[]>models;
        expect(typedObject[0].name).toContain('mock');
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
        appId: real_appId,
        versionId: real_versionId,
      };

      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getModels - invalid parameter `key`');
      done();
    }
  });
  it('if empty endpoint, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: undefined,
        key: fake_key,
        appId: real_appId,
        versionId: real_versionId,
      };

      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getModels - invalid parameter `endpoint`');
      done();
    }
  });
  it('if empty appId, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: real_endpoint,
        key: fake_key,
        appId: undefined,
        versionId: real_versionId,
      };

      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getModels - invalid parameter `appId`');
      done();
    }
  });
  it('if empty versionId, then throw error', async done => {
    try {
      const values: IValues = {
        endpoint: real_endpoint,
        key: fake_key,
        appId: real_appId,
        versionId: undefined,
      };

      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getModels - invalid parameter `versionId`');
      done();
    }
  });
  it('if undefined values, then throw error', async done => {
    try {
      // @ts-ignore
      const values = undefined;

      // @ts-ignore
      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('dfb-luis-apps-lib::getModels - values: IValues is empty');
      done();
    }
  });
  it('if empty values array, then throw error', async done => {
    try {
      const values = [];

      const apps: any = await LuisAppVersionModels.getModels(values);

      done(`didn't throw error but expected one, apps length ${apps.length}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(`dfb-luis-apps-lib::getModels - values: IValues is empty`);
      done();
    }
  });
});
