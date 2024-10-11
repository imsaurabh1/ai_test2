//Test file for models

const sinon = require('sinon');
const db = require('../config/db');
const toolsModel = require('../models/toolsModel');


let expect;

(async () => {
    expect = (await import('chai')).expect;
})();

describe('Tools Model', function () {
  // After each test, restore the original state of the database query
  afterEach(() => {
    sinon.restore();
  });

  // Test the fetchTools function
  describe('fetchTools', function () {
    //Test Case 1
    it('should fetch tools with correct query and parameters', async function () {
      // Mock data
      const mockResults = [
        { id: 1, shortName: 'Tool1', longName: 'Long Tool Name 1' },
        { id: 2, shortName: 'Tool2', longName: 'Long Tool Name 2' },
      ];

      // Mock the db.query method to return mock results
      const dbQueryStub = sinon.stub(db, 'query').callsFake((query, params, callback) => {
        callback(null, mockResults);
      });

      const conditions = ['shortName = ?'];
      const params = ['Tool1'];
      const orderBy = 'id';
      const orderDirection = 'ASC';

      const result = await toolsModel.fetchTools(conditions, params, orderBy, orderDirection);

      expect(dbQueryStub.calledOnce).to.be.true; 
      expect(result).to.deep.equal(mockResults); 
    });

    //Test Case 2
    it('should handle errors in fetchTools', async function () {
      // Mock db.query to call back with an error
      const dbQueryStub = sinon.stub(db, 'query').callsFake((query, params, callback) => {
        callback(new Error('Database error'));
      });

      const conditions = [];
      const params = [];
      const orderBy = 'id';
      const orderDirection = 'ASC';

      try {
        await toolsModel.fetchTools(conditions, params, orderBy, orderDirection);
      } catch (error) {
        expect(dbQueryStub.calledOnce).to.be.true; 
        expect(error.message).to.equal('Database error'); // Ensure error is thrown
      }
    });
  });

  // Test the insertTool function
  describe('insertTool', function () {
    //Test Case 3
    it('should insert a tool into the database', async function () {
      const toolData = {
        shortName: 'Test Tool',
        longName: 'Test Tool Long Name',
        contributors: 'Test Contributors',
        year: 2024,
        lastCommit: '2024-01-01',
        documentation: 'https://example.com',
        explanationAbstract: 'This is a test tool',
        plannerReferences: 'Test Ref',
        executable: 'https://example.com/exe',
        sourceCode: 'https://github.com/test/tool',
        implementationLanguages: 'JavaScript',
        operatingSystems: 'Linux, Windows',
        environmentNotes: 'Test Environment',
        planningLanguage: 'PDDL',
        planningClasses: 'Class A',
        planningType: 'Deterministic',
        excellenceScore: 5,
      };

      // Mock the db.query method to return a successful insert result
      const dbQueryStub = sinon.stub(db, 'query').callsFake((query, values, callback) => {
        callback(null, { insertId: 1 });
      });

      const toolId = 1;
      const result = await toolsModel.insertTool(toolId, toolData);

      expect(dbQueryStub.calledOnce).to.be.true; 
      expect(result).to.deep.equal({ insertId: 1 }); // Ensure the insert result is returned
    });

    //Test Case 4
    it('should handle errors in insertTool', async function () {
      // Mock db.query to call back with an error
      const dbQueryStub = sinon.stub(db, 'query').callsFake((query, values, callback) => {
        callback(new Error('Database error'));
      });

      const toolData = {
        shortName: 'Test Tool',
        longName: 'Test Tool Long Name',
        contributors: 'Test Contributors',
        year: 2024,

      };

      const toolId = 1;

      try {
        await toolsModel.insertTool(toolId, toolData);
      } catch (error) {
        expect(dbQueryStub.calledOnce).to.be.true; 
        expect(error.message).to.equal('Database error'); // Ensure error is thrown
      }
    });
  });
});
