require('dotenv').config();

import express from 'express';
import {router} from './router';

const app = express();

app.get('/', (res, req) => req.send({ok: true}));

app.use(router);

app.listen(process.env.PORT || 3004, () => console.log(`Server started on http://localhost:${process.env.PORT}`));