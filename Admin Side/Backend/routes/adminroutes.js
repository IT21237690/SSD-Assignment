const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Admin approval request route
router.patch('/approve/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    // Update teacher's isAdminApproved field to true
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, { isAdminApproved: true }, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    return res.status(200).json({ message: 'Teacher registration approved' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/teachers', async (req, res) => {
    try {
      const teachers = await Teacher.find({ isAdminApproved: false });
      return res.status(200).json(teachers);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
