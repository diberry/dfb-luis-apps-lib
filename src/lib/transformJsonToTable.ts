import { ILuisFlat, ILuisApp, ILuisModel, ILuisAppVersion } from './interfaces';

export const TransformJsonToTable = (apps: any[]): ILuisFlat[] => {
  if (!apps || apps.length === 0) return [] as ILuisFlat[];

  let fullTable: ILuisFlat[] = [];

  for (const app of apps as any[]) {
    if (!app.versions || app.versions.length === 0) {
      fullTable.push({ ...transformApp(app), ...transformVersion(null), ...transformModel(null) });
    } else {
      for (const version of app.versions as any[]) {
        if (!version.models || version.models.length === 0) {
          fullTable.push({ ...transformApp(app), ...transformVersion(version), ...transformModel(null) });
        } else {
          for (const model of version.models as any[]) {
            fullTable.push({ ...transformApp(app), ...transformVersion(version), ...transformModel(model) });
          }
        }
      }
    }
  }

  return fullTable;
};
const transformApp = (app: ILuisApp | null): any => {
  if (!app)
    return {
      appId: null,
      appName: null,
      appDescription: null,
      appCulture: null,
      appVersionsCount: 0,
      appCreatedDateTime: null,
      appEndpointHitsCount: 0,
      appActiveVersion: null,
      appTokenizerVersion: null,
    };

  return {
    appId: app.id,
    appName: app.name,
    appDescription: app.description,
    appCulture: app.culture,
    appVersionsCount: app.versionsCount,
    appCreatedDateTime: app.createdDateTime,
    appEndpointHitsCount: app.endpointHitsCount,
    appActiveVersion: app.activeVersion,
    appTokenizerVersion: app.tokenizerVersion,
  };
};
const transformVersion = (version: ILuisAppVersion | null): any => {
  if (!version)
    return {
      version: null,
      versionTrainingStatus: null,
      versionCreatedDate: null,
      versionLastModifiedDate: null,
      versionLastPublishedDate: null,
      versionLastTrainedDate: null,
    };

  return {
    version: version.version,
    versionTrainingStatus: version.trainingStatus,
    versionCreatedDate: version.createdDateTime,
    versionLastModifiedDate: version.lastModifiedDateTime,
    versionLastPublishedDate: version.lastPublishedDateTime,
    versionLastTrainedDate: version.lastTrainedDateTime,
  };
};
const transformModel = (model: ILuisModel | null): any => {
  if (!model)
    return {
      modelId: null,
      modelName: null,
      modelTypeId: null,
      modelReadableType: null,
      modelSubListsCount: 0,
      modelRolesCount: 0,
      modelChildrenCount: 0,
      modelExplicitListCount: 0,
      modelRegexPattern: null,
    };

  return {
    modelId: model.id,
    modelName: model.name,
    modelTypeId: model.typeId,
    modelReadableType: model.readableType,
    modelSubListsCount: model.subLists?.length || 0,
    modelRolesCount: model.roles?.length || 0,
    modelChildrenCount: model.children?.length || 0,
    modelExplicitListCount: model.explicitList?.length || 0,
    modelRegexPattern: model.regexPattern || null,
  };
};
