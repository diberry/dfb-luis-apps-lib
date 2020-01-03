import { request } from './httpRequest';
import { IValues, ILuisAppVersion, IFeatureFlags } from './interfaces';
import { LuisAppVersionModels } from './models';

export class LuisAppVersions {
  /**
   * Key names: key, endpoint, appId
   * @param values
   */
  static async getVersions(values: IValues, features?: IFeatureFlags): Promise<Array<ILuisAppVersion>> {
    try {
      if (!values || values === undefined || values === [] || values.length === 0)
        throw new Error('dfb-luis-apps-lib::getVersions - values: IValues is empty');

      if (!values.key || values.key === '' || values.key === undefined || values.key.length != 32) {
        throw new Error('dfb-luis-apps-lib::getVersions - invalid parameter `key`');
      }

      if (!values.endpoint || values.endpoint === '' || values.endpoint === undefined) {
        throw new Error('dfb-luis-apps-lib::getVersions - invalid parameter `endpoint`');
      }

      if (!values.appId || values.appId === '' || values.appId === undefined) {
        throw new Error('dfb-luis-apps-lib::getVersions - invalid parameter `appId`');
      }

      let requestOptions = {
        method: 'GET',
        url: `${values.endpoint}luis/authoring/v3.0-preview/apps/${values.appId}/versions?take=500`,
        headers: {
          'Ocp-Apim-Subscription-Key': values.key,
        },
      };

      if (values && values.retryDelay){
        requestOptions["retryDelay"] = values.retryDelay
      }

      const versionsAsObjects = await request(requestOptions);

      if (!features || features.models === false) return versionsAsObjects;

      for (let x of versionsAsObjects) {
        const tempValues: IValues = Object.assign(values, {});
        tempValues.versionId = x.version;

        const tempModels = await LuisAppVersionModels.getModels(tempValues);

        x.models = tempModels;
      }

      return versionsAsObjects;
    } catch (err) {
      throw err;
    }
  }
}
