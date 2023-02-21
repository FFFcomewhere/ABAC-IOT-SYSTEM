const express = require('express');
const app = express();
const port = 8001;
const dao = require('./dao');
const service = require('./service');

async function server() {
    await dao.init();
    // dao.userTest();
    // dao.deviceTest();
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    //User
    app.post('/loginUp', async (req, res) => {
        service.loginUp(req.body.username, req.body.password, req.body.readRole, req.body.writeRole);
        res.end();
    })

    app.post('/login', async (req, res) => {
        const result = await service.login(req.body.username, req.body.password);
        res.json(result);
    })

    app.post('/getUserInfo', async (req, res) => {
        const result = await service.getUserInfo(req.body.username);
        res.json(result);
    })

    app.get('/getUserList', async (req, res) => {
        const result = await service.getUserList();
        res.json(result);
    })

    //Device
    app.post('/addDevice', async (req, res) => {
        service.addDevice(req.body.name, req.body.state, req.body.power);
        res.end();
    })

    app.post('/deleteDevice', async (req, res) => {
        service.deleteDevice(req.body.name);
        res.end();
    })

    app.post('/updateDevice', async (req, res) => {
        service.updateDevice(req.body.name, req.body.state);
        res.end();
    })

    app.post('/getDeviceInfo', async (req, res) => {
        const result = await service.getDeviceInfo(req.body.name);
        res.json(result);
    })

    app.get('/getDeviceList', async (req, res) => {
        const result = await service.getDeviceList();
        res.json(result);
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}
