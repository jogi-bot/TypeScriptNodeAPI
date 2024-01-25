import express from 'express';
import item from './item';
import user from './user';


const app = express();

item(app)
user(app)


export default app;