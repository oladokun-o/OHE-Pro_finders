// controllers
const user = require('../controllers/user.js')
const router = require('express').Router();

router.get('/', user.onGetAllUsers)
router.post('/', user.onCreateUser)
router.get('/:id', user.onGetUserById)
router.delete('/:id', user.onDeleteUserById)

module.exports = router;