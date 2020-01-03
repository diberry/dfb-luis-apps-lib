import { request } from './lib/httpRequest';
import { IValues, IFeatureFlags } from './lib/interfaces';
require('dotenv').config()
import { LuisDataTable } from './lib/dataTable';

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
    it('if correct key, then get apps, versions', async done => {
        try {
            jest.setTimeout(20000);

            const values: IValues = {
                endpoint: process.env.LUIS_ENDPOINT,
                key: process.env.LUIS_ENDPOINT_KEY,
                retryDelay: 4000
              };
              const features: IFeatureFlags = {
                versions: true,
                models: false,
              };
              const dataTable = await LuisDataTable.getDataTable(values, features);
              expect(dataTable).not.toBe(undefined);
              expect(dataTable.apps).not.toBe(undefined);
              expect(dataTable.apps[0].versions).not.toBe(undefined);

              if(dataTable.apps[0].versions && dataTable.apps[0].versions[0]){
                expect(dataTable.apps[0].versions[0]).not.toHaveProperty('models');
              } else {
                expect("error").toEqual('can\'t determine if versions has models');
              }


              done();
        } catch (ex) {
            done(`${ex}`);
        }
    })
    it('if correct key, then get apps, versions, models', async done => {
        try {
            jest.setTimeout(10000);

            const values: IValues = {
                endpoint: process.env.LUIS_ENDPOINT,
                key: process.env.LUIS_ENDPOINT_KEY,
              };
              const features: IFeatureFlags = {
                versions: true,
                models: true,
              };
              const dataTable = await LuisDataTable.getDataTable(values, features);
              expect(dataTable).not.toBe(undefined);
              expect(dataTable.apps).not.toBe(undefined);


              if(dataTable.apps[0].versions && dataTable.apps[0].versions[0]){
                expect(dataTable.apps[0].versions[0]).toHaveProperty('models');
              } else {
                expect("error").toEqual('can\'t determine if versions has models');
              }

              done();
        } catch (ex) {
            done(`${ex}`);
        }
    })
})
