import Apps from './apps.json';
import Versions from './versions.json';
import Models from './models.json';
import Full from './fullNest.json';
import { TransformJsonToTable } from '../lib/transformJsonToTable';

const full = Full;

// deep copy - spread operator variations did work
const appsAndVersionsOnly: any = JSON.parse(JSON.stringify(full?.apps));

const pruneModels = () => {
  if (Array.isArray(appsAndVersionsOnly)) {
    appsAndVersionsOnly.map(app => {
      if (Array.isArray(app.versions)) {
        app.versions.map(version => {
          if (Array.isArray(version.models)) {
            version.models = [];
          }
        });
      }
    });
  }
};

const flatten = () => {
  return TransformJsonToTable(full?.apps);
};

pruneModels();
const fullFlattened = flatten();

const MockData = {
  Apps, // 9 total
  Versions, // 2 total
  Models,
  Full: full,
  FullFlat: fullFlattened,
  FullAppsAndVersionsOnly: appsAndVersionsOnly, //11
};

export { MockData };
