const request = require('request-promise');
//const retry = require('async-await-retry');
import { IValues } from './interfaces';

export interface ILuisApp {
  id: string;
  name: string;
  description: string;
  culture: string;
  usageScenario: string;
  domain: string;
  versionsCount: number;
  createdDateTime: string;
  endpoints: IEndpoints;
  endpointHitsCount: number;
  activeVersion: string;
  ownerEmail?: null;
  tokenizerVersion: string;
}
export interface IEndpoints {
  PRODUCTION?: IEndPointType | null;
  STAGING?: IEndPointType | null;
}
export interface IEndPointType {
  versionId: string;
  directVersionPublish: boolean;
  endpointUrl: string;
  isStaging: boolean;
  assignedEndpointKey?: null;
  region?: null;
  endpointRegion: string;
  publishedDateTime: string;
  failedRegions?: null;
}
export class LuisApps {
  static async getApps(values: IValues): Promise<Array<ILuisApp>> {
    
    if (!values) throw new Error("values: IValues is empty");
    
    if (!values.key || values.key==="" || values.key ===undefined || values.key.length != 32) {
      throw new Error('dfb-luis-apps-lib::getApps - invalid parameter `key`');
    }

    if (!values.endpoint || values.endpoint==="" || values.endpoint ===undefined) {
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
    const appsAtObjects = JSON.parse(myApps);

    return appsAtObjects;
  }
}

/*
const main = async (key): Promise<Array<LuisAppInterface>> => {
    try {

        const retryConfig: any = {
            interval: 1000 //ms
        };

        return await retry(apps, key, retryConfig);

    } catch (err) {
        console.log('The function execution failed !')
    }
}
*/
