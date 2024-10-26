const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const{setGoal,getUserGoals,updateGoalProgress,deleteGoal} = require('../controllers/goalController');


const router = express.Router();

router.post('/set', protect,setGoal)
router.get('/getuser',protect,getUserGoals)
router.put('/update/:id',protect,updateGoalProgress)
router.delete('/delete/:id',protect,deleteGoal)

module.exports = router;

