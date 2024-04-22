import { Router } from 'express';

const router = Router();

router.get('/jersey', (req, res) => {
    res.send('GET request to the homepage');
});

export default router;