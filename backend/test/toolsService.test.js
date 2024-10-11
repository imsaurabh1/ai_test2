//Test file for services

const sinon = require('sinon');
const toolsModel = require('../models/toolsModel');
const { searchTools } = require('../services/toolSearchService');
const { sortTools } = require('../services/toolSortService');
const { filterTools } = require('../services/toolFilterService');
let expect;

(async () => {
    expect = (await import('chai')).expect;
})();

describe('Tool Services', function () {
    afterEach(() => {
        sinon.restore();
    });
    
    //Test Case 1
    it('should search tools based on search term', async function () {
        const mockTools = [
            { id: 1, shortName: 'Test Tool 1', description: 'Description 1' },
            { id: 2, shortName: 'Test Tool 2', description: 'Description 2' },
        ];
        sinon.stub(toolsModel, 'fetchTools').resolves(mockTools);

        const searchTerm = 'Test';
        const result = await searchTools(searchTerm);
        
        expect(result.tools).to.deep.equal(mockTools);
        
        const expectedConditionPattern = 'shortName LIKE ? OR longName LIKE ?';
        const conditionMatch = result.conditions.some(condition => condition.includes('shortName LIKE'));
        expect(conditionMatch).to.be.true;
        

        expect(result.params).to.have.lengthOf(12); // there are 12 searchable fields
        expect(result.params).to.all.include('%Test%');
    });

    //Test Case 2
    it('should sort tools based on sorting criteria', async function () {
        const mockTools = [
            { id: 1, year: 2021 },
            { id: 2, year: 2022 },
        ];
        sinon.stub(toolsModel, 'fetchTools').resolves(mockTools);

        const sortField = 'year';
        const sortOrder = 'asc';
        const result = await sortTools(sortField, sortOrder);
        
        expect(result).to.deep.equal(mockTools);
        sinon.assert.calledWith(toolsModel.fetchTools, sinon.match.any, sinon.match.any, 'year', 'ASC');
    });

    //Test Case 3
    it('should filter tools based on filter criteria', async function () {
        const mockTools = [
            { id: 1, planningLanguage: 'PDDL' },
            { id: 2, planningLanguage: 'RDDL' },
        ];
        sinon.stub(toolsModel, 'fetchTools').resolves(mockTools);

        const filterCriteria = { languages: 'PDDL,RDDL' };
        const result = await filterTools(filterCriteria);
        
        expect(result.tools).to.deep.equal(mockTools);
        expect(result.conditions).to.include('(planningLanguage LIKE ? OR planningLanguage LIKE ?)');
        expect(result.params).to.include('%PDDL%').and.include('%RDDL%');
    });
});
