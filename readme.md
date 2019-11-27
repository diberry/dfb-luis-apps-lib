# Middleware for LUIS authoring

## Apps, versions, and models

Given an endpoint and key, the middleware returns an object with an array of all apps, with versions per app, with models per version.

## How to run

1. npm install dfb-luis-apps-lib
1. Create `index.js` with the following: 

    ```
    const LuisDataTable = require('dfb-luis-apps-lib').LuisDataTable;
    const getDataTable = async () => {
        try {
            const values = {
                'endpoint': 'https://westus.api.cognitive.microsoft.com/',
                'key': 'REPLACE-WITHh-YOUR-AUTHORING-KEY'
            };
            const features = {
                'versions': true,
                'models': true
            };
    
            return await LuisDataTable.getDataTable(values, features);
    
        } catch (err) {
            console.log(err);
        }
    }
    
    getDataTable().then((dataTable) => {
        console.log(JSON.stringify(dataTable));
    }).catch(err => {
        console.log(err);
    })
    ```

1. Change the endpoint and the key to your own authoring key and endpoint. 
1. Run at the terminal or command line with: `node index.js > apps.json`.
1. Open apps.json file to review output. 

## Caveats

* Values object is required. 
* Features object is optional. Turn features on get the versions and models. 
* `.d.ts` files are available for typescript projects.
