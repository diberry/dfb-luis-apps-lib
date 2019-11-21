module.exports = jest.fn(() => Promise.resolve(JSON.stringify(require('../json/apps.json'))));
