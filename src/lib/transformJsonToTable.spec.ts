//import {  ILuisFull } from './interfaces';
import { MockData } from '../mockData/index';
import { TransformJsonToTable } from './transformJsonToTable';

describe('TestData', () => {
  describe('TransformJsonToTable', () => {
    it('no param returns empty table', done => {
      const json = [];
      const result = TransformJsonToTable(json);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(0);
      done();
    });
    it('params returns flattened table', done => {
      const json = MockData.Full.apps;

      const result = TransformJsonToTable(json);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(139);
      done();
    });
    it('params returns just apps as flattened table', done => {
      const json = MockData.Apps;

      const result = TransformJsonToTable(json);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].version).toBe(null);
      expect(result[0].modelId).toBe(null);
      expect(result.length).toEqual(9);
      done();
    });
    it('params returns just apps and versions as flattened table', done => {
      const json = MockData.FullAppsAndVersionsOnly;

      const result = TransformJsonToTable(json);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]?.version).not.toBe(null);
      expect(result[0].modelId).toBe(null);
      expect(result.length).toEqual(11);
      done();
    });
  });
});
