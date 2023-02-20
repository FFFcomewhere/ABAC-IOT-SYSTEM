const express = require('express');
const app = express();
const port = 8001;
const dao = require('./dao');

const server = async () => {
    await dao.init();
    dao.userTest();
    dao.deviceTest();

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

server();