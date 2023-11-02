const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

const router = require('express').Router();
module.exports = router;

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));