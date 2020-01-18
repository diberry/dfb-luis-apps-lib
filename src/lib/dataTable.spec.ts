import { IValues, IFeatureFlags } from './interfaces';
import { LuisDataTable } from '../index';
import { MockData } from '../mockData/index';

jest.mock('./httpRequest', () => ({
  request: jest.fn(() => {
    return Promise.resolve(MockData.Apps);
  }),
}));

const fake_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const real_endpoint = 'https://westus.api.cognitiveservices.azure.com/';

describe('LUIS Data Table', () => {
  describe('returns 2xx', () => {
    it('if correct key, then get DataTable', async done => {
      try {
        const values: IValues = {
          endpoint: real_endpoint,
          key: fake_key,
        };
        const features: IFeatureFlags = {
          versions: false,
          models: false,
        };

        const dataTable = await LuisDataTable.getDataTable(values, features);
        expect(dataTable).not.toBe(undefined);
        expect(dataTable.apps).not.toBe(undefined);

        if (dataTable && dataTable.apps && dataTable.apps[0]) {
          expect(dataTable?.apps[0]).not.toHaveProperty('versions');
        } else {
          expect('error').toEqual("can't determine if apps has first element");
        }

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

        await LuisDataTable.getDataTable(values);

        done(`didn't throw error but expected one`);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('dfb-luis-apps-lib::getDataTable - invalid parameter `key`');
        done();
      }
    });
    it('if empty endpoint, then throw error', async done => {
      try {
        const values: IValues = {
          endpoint: undefined,
          key: fake_key,
        };

        await LuisDataTable.getDataTable(values);

        done(`didn't throw error but expected one`);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('dfb-luis-apps-lib::getDataTable - invalid parameter `endpoint`');
        done();
      }
    });
    it('if undefined values, then throw error', async done => {
      try {
        // @ts-ignore
        const values = undefined;

        // @ts-ignore
        await LuisDataTable.getDataTable(values);

        done(`didn't throw error but expected one`);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('values: IValues is empty');
        done();
      }
    });
    it('if empty values array, then throw error', async done => {
      try {
        // @ts-ignore
        const values = [];

        // @ts-ignore
        await LuisDataTable.getDataTable(values);

        done(`didn't throw error but expected one`);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(`values: IValues is empty`);
        done();
      }
    });
  });
});
