const request = require('request-promise');

import { IValues, ILuisApp, IFeatureFlags } from './interfaces';
import { LuisAppVersions } from './versions';

export class LuisApps {
  static async getApps(values: IValues, features?: IFeatureFlags): Promise<Array<ILuisApp>> {
    try {

      if (!values || values === undefined || values === [] || values.length === 0) throw new Error("dfb-luis-apps-lib::getApps values is empty");

      if (!values.key || values.key === "" || values.key === undefined || values.key.length != 32) {
        throw new Error('dfb-luis-apps-lib::getApps - invalid parameter `key`');
      }

      if (!values.endpoint || values.endpoint === "" || values.endpoint === undefined) {
        throw new Error('dfb-luis-apps-lib::getApps - invalid parameter `endpoint`');
      }

      let requestOptions = {
        method: 'GET',
        url: `${values.endpoint}luis/api/v2.0/apps?take=500`,
        headers: {
          'Ocp-Apim-Subscription-Key': values.key,
        },
      };

      const myApps = await request(requestOptions);
      const appsAsObjects = JSON.parse(myApps);

      if (!features || features.versions===false) return appsAsObjects;

      for (let x of appsAsObjects) {

        const tempValues: IValues = Object.assign(values, {});
        tempValues.appId  = x.id;

        const tempVersions = await LuisAppVersions.getVersions(tempValues, features);

        x.versions = tempVersions;
      }

      return appsAsObjects;

    } catch (err) {
      throw err;
    }
  }
}