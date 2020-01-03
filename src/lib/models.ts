import { request } from './httpRequest';
import { IValues, ILuisModel } from './interfaces';

export class LuisAppVersionModels {
  /**
   * Key names: key, endpoint, appId, versionId
   * @param values
   */
  static async getModels(values: IValues): Promise<Array<ILuisModel>> {
    try {
      if (!values || values === undefined || values === [] || values.length === 0)
        throw new Error('dfb-luis-apps-lib::getModels - values: IValues is empty');

      if (!values.key || values.key === '' || values.key === undefined || values.key.length != 32) {
        throw new Error('dfb-luis-apps-lib::getModels - invalid parameter `key`');
      }

      if (!values.endpoint || values.endpoint === '' || values.endpoint === undefined) {
        throw new Error('dfb-luis-apps-lib::getModels - invalid parameter `endpoint`');
      }

      if (!values.appId || values.appId === '' || values.appId === undefined) {
        throw new Error('dfb-luis-apps-lib::getModels - invalid parameter `appId`');
      }

      if (!values.versionId || values.versionId === '' || values.versionId === undefined) {
        throw new Error('dfb-luis-apps-lib::getModels - invalid parameter `versionId`');
      }

      let requestOptions = {
        method: 'GET',
        url: `${values.endpoint}luis/authoring/v3.0-preview/apps/${values.appId}/versions/${values.versionId}/models?skip=0&take=500`,
        headers: {
          'Ocp-Apim-Subscription-Key': values.key,
        },
      };

      if (values && values.retryDelay){
        requestOptions["retryDelay"] = values.retryDelay
      }

      const myModels = await request(requestOptions);

      return myModels;
    } catch (err) {
      throw err;
    }
  }
}
