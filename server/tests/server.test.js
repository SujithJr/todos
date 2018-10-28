const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {Users} = require('./../models/user');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo'
    }
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());

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
            expect(todos.length).toBe(2);
            done();
        } catch(e) {
            done(e);
        }
        }); 
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return the todo with that specified id', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 for id not present in the db', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for id not present in the db', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });
});
