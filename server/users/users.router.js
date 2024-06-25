const express = require('express');
const { fetchAllUsers, fetchUserById } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await fetchAllUsers();
  res.status(200).json(users);
});

router.get('/user', async (req,res)=>{
  try{
    
  const user = await fetchUserById(req.query.userId)
 
  res.json(user)
  }
  catch{
    res.status(404).json({message : 'user not found'});
  }
})
module.exports = router;
