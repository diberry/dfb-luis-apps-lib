import { MockData } from '../mockData/index';

describe('MockData', () => {
  it('Full', done => {
    const full = MockData.Full;

    expect(full?.apps.length).toBe(6);
    expect(full?.apps[0].versions.length).toBe(2);
    expect(full?.apps[0].versions[0].models.length).toBe(26);

    done();
  });
  it('AppsAndVersions', done => {
    const full = MockData.Full;
    const versionsAndModels = MockData.FullAppsAndVersionsOnly;

    expect(full?.apps.length).toBe(6);
    expect(full?.apps[0].versions.length).toBe(2);
    expect(full?.apps[0].versions[0].models.length).toBe(26);
    expect(versionsAndModels[0].versions[0].models.length).toBe(0);
    done();
  });
});
