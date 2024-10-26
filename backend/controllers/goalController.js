const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');

const setGoal = asyncHandler(async(req,res)=> {
    const {type,target,progress,notes} = req.body;

    try{
    const goal = await Goal.create({
        user: req.user._id,
        type,
        target,
        progress,
        notes,

    })
    if(goal) {
        res.status(201).json(goal)
        console.log(goal);
    }
    else {
        res.status(400).json({message: 'Failed to create goal'})
    }
}
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'})
    }
})

const getUserGoals = asyncHandler(async(req,res) => {
    try{
    const goals = await Goal.find({user:req.user._id})

    if(goals){
        res.json(goals);
    }
    else{
        res.status(400).json({message : "Goals not found"})
    }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'})
    }
})

const updateGoalProgress = asyncHandler(async(req,res)=>{
    const {progress} = req.body;
    try{
        const goals = await Goal.findById(req.params.id)
        if(goals){
            goals.progress = progress;
            const updatedProgress = await goals.save();
            res.json(updatedProgress);
        }
        else{
            res.status(404).json({message : "Goal not found"})
        }

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'})
    }
})




 const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params; 

    try {
        const goal = await Goal.findById(id);

        if (goal) {
           
            if (goal.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this goal' });
            }

            await goal.deleteOne();
            res.json({ message: 'Goal Deleted successfully' });
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error) {
        console.error("Error deleting",error)
        res.status(500).json({ message: 'Server error'});
    }
});


module.exports = {setGoal, getUserGoals,updateGoalProgress,deleteGoal};