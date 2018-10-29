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

    it('should return 404 for invalid id', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete the todo', (done) => {
        const id = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(id);
        })
        .end(async (err, res) => {
            try {
                const todo = await Todo.findOneAndRemove({_id: id})
                expect(todo).toBeFalsy();
                done();
            } catch(e) {
                done(e);
            }
        });
    });

    it('should return 404 if todo not found', (done) => {
        const dataId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${dataId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for ids that are not valid', (done) => {
        request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = "This is dummy text";
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: true,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toEqual(text);
            expect(res.body.todo.completed).toBeTruthy();
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });

    it('should clear completedAt when completed is false', (done) => {
        const hexId = todos[1]._id.toHexString();
        const text = "This is dummy text 123456";

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toEqual(text);
            expect(res.body.todo.completed).toBeFalsy();
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
    });
});