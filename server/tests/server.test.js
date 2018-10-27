const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {Users} = require('./../models/user');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
    // done();
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end(async (err, res) => {
            try {
                const todos = await Todo.find({text});
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            } catch(e) {
                done(e);
            } 
        });
    });

    it('should not create a todo with invalid data', (done) => {
        
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end(async (err, res) => {
            try {
                const todos = await Todo.find();
                expect(todos.length).toBe(0);
                done();
            } catch(e) {
                done(e);
            }
        }); 
    });
});