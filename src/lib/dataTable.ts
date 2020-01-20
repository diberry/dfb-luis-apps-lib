import { IValues, IFeatureFlags } from './interfaces';
import { LuisApps } from './apps';
import { MockData } from '../mockData';
import { TransformJsonToTable } from './transformJsonToTable';

export class LuisDataTable {

  static async getDataTable(values: IValues, features: IFeatureFlags): Promise<any> {

    if (!values || values === undefined || values === [] || values.length === 0)
      throw new Error('values: IValues is empty');

    if (!values.key || values.key === '' || values.key === undefined || values.key.length != 32) {
      throw new Error('dfb-luis-apps-lib::getDataTable - invalid parameter `key`');
    }

    if (!values.endpoint || values.endpoint === '' || values.endpoint === undefined) {
      throw new Error('dfb-luis-apps-lib::getDataTable - invalid parameter `endpoint`');
    }

    let data =  (features.pivot) ?
      await LuisDataTable.getFlattenedDataTable(values, features) :
      await LuisDataTable.getNestedDataTable(values, features);

    return {
      apps: data,
      features
    }
  }
  static async getNestedDataTable(values: IValues, features: IFeatureFlags): Promise<any[]> {

    if(features.mockData) return MockData.Full.apps;

    return await LuisApps.getApps(values, features);
  }
  static async getFlattenedDataTable(values: IValues, features: IFeatureFlags): Promise<any[]> {

    if(features.mockData) return MockData.FullFlat;

    return TransformJsonToTable(await LuisApps.getApps(values, features));
  }
}
