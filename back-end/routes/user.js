const express=require('express')
const { adduser, findUsers, deleteUser, editUser, findUser } = require('../controllers/userController')
const router=express.Router()

router.get('/', findUsers)
router.post('/',adduser)

router.get('/:id', findUser)
router.delete('/:id', deleteUser)
router.patch('/:id',editUser)

module.exports=router;