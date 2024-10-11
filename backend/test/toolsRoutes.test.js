//Test file for routes

const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
let expect;

(async () => {
    expect = (await import('chai')).expect;
})();

const toolBasicRetrievalService = require('../services/toolBasicRetrievalService');
const toolSearchService = require('../services/toolSearchService');
const toolSortService = require('../services/toolSortService');
const toolFilterService = require('../services/toolFilterService');
const toolAddService = require('../services/toolAddService');
const toolsModel = require('../models/toolsModel');
const toolsRouter = require('../routes/tools');

const app = express();
app.use(express.json());
app.use('/tools', toolsRouter);

describe('Tools API Routes', function () {
    afterEach(() => {
        sinon.restore();
    });

    //Test Case 1
    it('should fetch all tools', function (done) {
        const mockTools = [
            { id: 1, name: 'Tool 1', description: 'Description 1' },
            { id: 2, name: 'Tool 2', description: 'Description 2' },
        ];
        sinon.stub(toolBasicRetrievalService, 'getAllTools').resolves(mockTools);

        request(app)
            .get('/tools/all')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(2);
                done();
            });
    });

    //Test Case 2
    it('should process the query for search, filter, and sort', function (done) {
        const mockFilteredTools = [
            { id: 1, name: 'Filtered Tool 1' },
            { id: 2, name: 'Filtered Tool 2' },
        ];
        sinon.stub(toolFilterService, 'filterTools').resolves({ tools: mockFilteredTools, conditions: [], params: [] });
        sinon.stub(toolSearchService, 'searchTools').resolves({ tools: mockFilteredTools, conditions: [], params: [] });
        sinon.stub(toolSortService, 'sortTools').resolves(mockFilteredTools);

        request(app)
            .get('/tools/query')
            .query({ search: 'test', sort: 'name', order: 'asc' })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(2);
                done();
            });
    });

    //Test Case 3
    it('should add a new tool', function (done) {
        const newTool = { name: 'New Tool', description: 'New Tool Description' };
        sinon.stub(toolAddService, 'addTool').resolves();

        request(app)
            .post('/tools/tool-add')
            .send(newTool)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('message', 'Tool added successfully!');
                done();
            });
    });

    //Test Case 4
    it('should fetch distinct planning types', function (done) {
        const mockPlanningTypes = ['Type 1', 'Type 2'];
        sinon.stub(toolsModel, 'fetchDistinctPlanningTypes').resolves(mockPlanningTypes);

        request(app)
            .get('/tools/planning-types')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(2);
                expect(res.body).to.deep.equal(mockPlanningTypes);
                done();
            });
    });
});
