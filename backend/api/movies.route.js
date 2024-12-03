import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => res.send("Hello, Ariel!"));

export default router;