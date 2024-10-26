const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const{logActivity,getUserActivities,updateActivity, deleteActivity} = require('../controllers/activityController');


const router = express.Router();

router.post('/log',protect,logActivity);
router.get('/',protect,getUserActivities);
router.put('/activities/:id',protect,updateActivity);
router.delete('/activities/:id',protect,deleteActivity);

module.exports = router;