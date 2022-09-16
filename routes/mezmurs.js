import express from "express";
import auth from "../middleware/auth.js";

//import { Router } from "express";

import { getMezmurs, addMezmur, getSingleMezmur, deleteMezmur, updateMezmur } from "../controllers/mezmurs.js";

const mezmursRouter = express.Router();

// mezmursRouter.route('/').get(getMezmurs);
mezmursRouter.get('/', getMezmurs);
mezmursRouter.post('/', auth, addMezmur);
mezmursRouter.post('/:id', auth, updateMezmur);
mezmursRouter.get('/:id', getSingleMezmur);
mezmursRouter.delete('/:id', auth, deleteMezmur);

export default mezmursRouter;
