import Apps from './apps.json';
import Versions from './versions.json';
import Models from './models.json';
import Full from './fullNest.json';

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

pruneModels();

const MockData = {
  Apps, // 9 total
  Versions, // 2 total
  Models,
  Full: full,
  FullAppsAndVersionsOnly: appsAndVersionsOnly, //11
};

export { MockData };
