import { IValues, ILuisDataTable, IFeatureFlags } from './interfaces';
import { LuisApps } from './apps';

export class LuisDataTable {
  static async getDataTable(values: IValues, features?: IFeatureFlags): Promise<ILuisDataTable> {
    if (!values || values === undefined || values === [] || values.length === 0)
      throw new Error('values: IValues is empty');

    if (!values.key || values.key === '' || values.key === undefined || values.key.length != 32) {
      throw new Error('dfb-luis-apps-lib::getDataTable - invalid parameter `key`');
    }

    if (!values.endpoint || values.endpoint === '' || values.endpoint === undefined) {
      throw new Error('dfb-luis-apps-lib::getDataTable - invalid parameter `endpoint`');
    }

    let dataTable: ILuisDataTable = {
      apps: [],
    };

    dataTable.apps = await LuisApps.getApps(values, features);

    return dataTable;
  }
}
