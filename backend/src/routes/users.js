import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
    res.send('GET request to the homepage');
});

export default router;