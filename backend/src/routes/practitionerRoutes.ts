import express from 'express';
const router = express.Router();

// Basic CRUD routes for practitioners
router.get('/', (req, res) => {
    // TODO: Implement get all practitioners
    res.send('Get all practitioners');
});

router.get('/:id', (req, res) => {
    // TODO: Implement get practitioner by id
    res.send('Get practitioner by id');
});

export default router;