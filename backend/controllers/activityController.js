const asyncHandler  = require('express-async-handler');
const Activity  = require('../models/Activity');
const User = require('../models/User');

const logActivity = asyncHandler(async(req,res)=> {
    const {type,duration,distance,caloriesBurned,notes} = req.body;
  try{
    const activity = await Activity.create({

        user: req.user._id,
        type,
        duration,
        distance,
        caloriesBurned,
        notes,
        
    })
    if(activity){
        res.status(201).json(activity);
        console.log(activity);

    }
    else{
        res.status(404).json({message:"Activity not found"})
    }

}
catch (error){
    console.error(error);
    res.status(500).json({message: "Server Error"})
 
}
})


const getUserActivities = asyncHandler(async(req,res)=> {
    try{
        const activities = await Activity.find({user: req.user._id})
        if(activities){
        res.json(activities);
    }
    else{
        res.json(404).json({message:"User Activity not found"});
    }
}
catch(error){
    console.error(error);
    res.status(500).json({message: "Server Error"})
}

})

 const updateActivity = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const { type, duration, distance, caloriesBurned,notes } = req.body;

    try {
        
        const activity = await Activity.findById(id);

        if (activity) {
           
            if (activity.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this activity' });
            }

           
            activity.type = type || activity.type;
            activity.duration = duration || activity.duration;
            activity.distance = distance || activity.distance;
            activity.caloriesBurned = caloriesBurned || activity.caloriesBurned;
            activity.notes = notes || activity.notes;

            const updatedActivity = await activity.save();

            res.json(updatedActivity);
        } else {
            res.status(404).json({ message: 'Activity not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

const deleteActivity = asyncHandler(async(req,res)=> {
    const { id } = req.params;

    try{
    const activity = await Activity.findById(id);

    if(activity)
        {
        if(activity.user.toString() === req.user._id.toString()){
            await activity.deleteOne();
            res.json({message : "Activity deleted successfully"})
        }
        else{
            res.status(401).json({message : "Not authorized to delete this activity"})
        }
    }
}
catch(error){
    console.error(error);
    res.status(500).json({message: "Server Error"})
 
}
})



module.exports = {logActivity,getUserActivities,updateActivity,deleteActivity};