export interface IFeatureFlags {
  versions?: boolean;
  models?: boolean;
}
export interface IValues {
  /* Key value pairs for all the field values with key being the field name */
  [key: string]: any;
}

export interface ILuisFull {
  appId: string;
  appName: string;
  appDescription: string | null;
  appCulture: string;
  appVersionsCount: number | null;
  appCreatedDateTime: string | null;
  appEndpointHitsCount: number | null;
  appActiveVersion: string | null;
  appTokenizerVersion: string | null;

  version: string;
  versionTrainingStatus: string;
  versionCreatedDate: string;
  versionLastModifiedDate: string;
  versionLastPublishedDate: string;
  versionLastTrainedDate: string;

  modelId: string;
  modelName: string;
  modelTypeId: number;
  modelReadableType: string;
  modelSubListsCount: number | null;
  modelRolesCount: number | null;
  modelChildrenCount: number | null;
  modelExplicitListCount: number | null;
  modelRegexPattern: string;
}

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
  versions?: ILuisAppVersion[];
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
export interface ILuisAppVersion {
  version: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  lastTrainedDateTime: string;
  lastPublishedDateTime?: string | undefined | null;
  endpointUrl?: any;
  assignedEndpointKey?: any;
  externalApiKeys?: any;
  intentsCount: number;
  entitiesCount: number;
  endpointHitsCount: number;
  trainingStatus: string;
  models?: ILuisModel[];
}
export interface ILuisDataTable {
  apps?: ILuisApp[];
}

export interface ILuisModel {
  id: string;
  name: string;
  typeId: number;
  readableType: string;
  subLists?: ILuisModelSubList[];
  roles?: ILuisModelRole[];
  children?: ILuisModelChild[];
  explicitList?: ILuisExplicitItem[];
  regexPattern?: string;
}

export interface ILuisExplicitItem {
  id: string;
  explicitListItem: string;
}

export interface ILuisModelChild {
  id: string;
  name: string;
  instanceOf?: string;
  children?: ILuisModelChild[];
  typeId: number;
  readableType?: string;
}

export interface ILuisModelRole {
  id: string;
  name: string;
}

export interface ILuisModelSubList {
  id: number;
  canonicalForm: string;
  list: string[];
}
