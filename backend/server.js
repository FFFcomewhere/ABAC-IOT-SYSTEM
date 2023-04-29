const express = require('express');
const { authenticateToken } = require('./auth');
const router = express.Router();
const auth = require("./auth");
const app = express();
const port = 8001;
const service = require('./service');
const accessCtl = require('./accessCtl');

const errorWithoutPermission = "errorWithoutPermission";
const errorWrongPassword = "errorWrongPassword";

module.exports = {
    server: server
}

//路由设置
app.use(express.json());

const cors = require('cors');
console.log("cors");
app.use(cors({
    //origin: 'http://localhost:9999',
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200
}))
console.log("cors");


async function server() {
    await service.init();

    // //解决跨域问题
    // app.use(function (req, res, next) {
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader("Access-Control-Allow-Methods", "*");
    //     next();
    // });

    app.get('/', (req, res) => {
        res.send('Hello World!');
        res.status(200).end();
    })

    //User
    app.post('/register', async (req, res) => {
        service.register(req.body.username, req.body.password, req.body.confirmPassword, req.body.role);
        res.status(200).end();
    })

    app.post('/login', async (req, res) => {
        const result = await service.login(req.body.username, req.body.password);
        res.json(result);
        res.status(200).end();
    })
    app.post('/getUserInfo', auth.authenticateToken, async (req, res) => {
        if (req.user.username != req.body.username) {
            res.status(400).send({ error: errorWrongPassword });
            return;
        }
        const result = await service.getUserInfo(req.body.username);
        res.json(result);
        res.status(200).end();
    })

    app.get('/getUserList', auth.authenticateToken, async (req, res) => {
        if (req.user.role != "root") {
            res.status(400).send({ error: errorWithoutPermission });
            return;
        }
        const result = await service.getUserList();
        res.json(result);
        res.status(200).end();
    })

    //Device
    app.post('/addDevice', auth.authenticateToken, async (req, res) => {
        service.addDevice(req.body.name, req.body.state);
        if (req.user && req.user.role == "root") {
            service.addPolicy(req.user.role, req.body.name, "write");
        }
        service.addPolicy(req.user.role, req.body.name, "read");
        res.status(200).end();
    })

    app.post('/deleteDevice', auth.authenticateToken, async (req, res) => { 
        if (! await (req.user.role == "root" || accessCtl.baseVerify(req.user.role, req.body.name, 'write'))) {
            res.status(400).send({ error: errorWithoutPermission }).end();
            return;
        }

        service.deleteDevice(req.body.name);
        res.status(200).end();
    })

    app.post('/updateDevice', auth.authenticateToken, async (req, res) => {
        if (! await (accessCtl.baseVerify(req.user.role, req.body.name, 'write'))) {
            res.status(400).send({ error: errorWithoutPermission }).end();
            return;
        }
        service.updateDevice(req.body.name, req.body.state);
        res.status(200).end();
    })

    app.post('/getDeviceInfo', auth.authenticateToken, async (req, res) => {
        if (! await accessCtl.baseVerify(req.user.role, req.body.name, 'read')) {
            res.status(400).send({ error: errorWithoutPermission }).end();
            return;
        }
        const result = await service.getDeviceInfo(req.body.name);
        res.json(result);
    })

    app.get('/getDeviceList', auth.authenticateToken, async (req, res) => {
        // if (! await (req.user.role != "root" || accessCtl.baseVerify(req.user.role, req.body.name, 'read'))) {
        //     res.status(400).send({ error: errorWithoutPermission }).end();
        //     return;
        // }
        const result = await service.getDeviceList();
        res.json(result);
    })

    //Policy
    app.post('/addPolicy', auth.authenticateToken, async (req, res) => {
        //非root用户无权限
        if (req.user && req.user.role != "root") {
            res.status(400).send({ error: errorWithoutPermission }).end();
            return;
        }
        service.addPolicy(req.body.role, req.body.deviceName, req.body.operation);
        await accessCtl.loadPolicy();
        res.status(200).end();
    })

    //更新策略
    app.post('/updatePolicy', auth.authenticateToken, async (req, res) => {
        //非root用户无权限
        if (req.user && req.user.role != "root") {
            res.status(400).send({ error: errorWithoutPermission }).end();
            return;
        }
        service.updatePolicy(req.body.role, req.body.deviceName, req.body.operation);
        await accessCtl.loadPolicy();
        res.status(200).end();
    })


    app.post('/deletePolicy', auth.authenticateToken, async (req, res) => {
        //非root用户无权限
        if (req.user && req.user.role != "root") {
            res.status(400).send({ error: errorWithoutPermission });
            return;
        }
        service.deletePolicy(req.body.role, req.body.deviceName, req.body.operation);
        await accessCtl.loadPolicy();
        res.end();
    })

    app.post('/getPolicyInfo', auth.authenticateToken, async (req, res) => {
        const result = await service.getPolicyInfo(req.body.role, req.body.deviceName);
        res.json(result);
    })

    app.get('/getPolicyList', auth.authenticateToken, async (req, res) => {
        if (req.user && req.user.role != "root") {
            res.status(400).send({ error: errorWithoutPermission });
            return;
        }
        const result = await service.getPolicyList();
        res.json(result);
    })


    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

//server();

