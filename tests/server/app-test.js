// Disclaimer: I Did not write this file. Minor changes/Alterations from repo, se link below
// Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/server/app-test.js

const request = require('supertest');

const {app} = require('../../src/server/app');
const db = require('../../src/server/db/repository');

beforeEach(() => {db.initWithSomeItems();});

test("Test get all", async () =>{

    const response = await request(app).get('/api/items');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(4);
});


test("Test not found item", async () =>{
    const response = await request(app).get('/api/items/-345');

    expect(response.statusCode).toBe(404);
});


test("Test retrieve each single item", async () => {

    const responseAll = await request(app).get('/api/items');
    expect(responseAll.statusCode).toBe(200);

    const items = responseAll.body;
    expect(items.length).toBe(4);

    for (let i=0; i<items.length; i++){
        const res = await request(app).get('/api/items/'+items[i].id);
        const item = res.body;

        expect(item.itemName).toBe(items[i].itemName);
    }
});

//TODO: FIX THIS TEST

test("Test create items", async () => {

    const user = request.agent(app);

    const signup = await user.post('/api/signup')
        .send({userId:'foo', password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const response = await user.post('/api/items');

    expect(response.statusCode).toBe(201);

    const response1 = await user.post('/api/create');
    expect(response1.statusCode).toBe(200);


    let responseAll = await request(app).get('/api/items');
    const n = responseAll.body.length;

    const name = "foo";

    const resPost = await request(app)
        .post('/api/create')
        .send({name:name, description: "bar"})
        .set('Content-Type', 'application/json');

    expect(resPost.statusCode).toBe(200);
    const location = resPost.header.location;

    responseAll = await request(app).get('/api/items');
    expect(responseAll.body.length).toBe(n);

    const resGet = await request(app).get('/api/items');
    expect(resGet.statusCode).toBe(200);
    //expect(resGet.body.name).toBe(name);

});




test("Delete all items", async () => {
    let responseAll = await request(app).get('/api/items');
    expect(responseAll.statusCode).toBe(200);

    const items = responseAll.body;
    expect(items.length).toBe(4);

    for (let i = 0; i < items.length; i++){
        const res = await request(app).delete('/api/items/'+items[i].id);
        expect(res.statusCode).toBe(204);
    }

    responseAll = await request(app).get('/api/items');
    expect(responseAll.statusCode).toBe(200);
    expect(responseAll.body.length).toBe(0);
});



