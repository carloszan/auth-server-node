import express from 'express';
import {router} from './router';

const app = express();

app.get('/', (res, req) => req.send({ok: true}));

app.use(router);

app.listen(3004, () => console.log("Server started on http://localhost:3004"));