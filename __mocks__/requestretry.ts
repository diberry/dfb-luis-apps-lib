module.exports = jest.fn(() => Promise.resolve(JSON.stringify(require('../src/mockData/apps.json'))));
