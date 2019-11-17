const request = require("request-promise");
//const retry = require('async-await-retry');

export interface IApp {
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
  export class Apps {

      static async getApps (key): Promise<Array<IApp>> {
    
        let requestOptions = {
            method: "GET",
            url: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps?take=500",
            headers: {
                "Ocp-Apim-Subscription-Key": key
            }
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
