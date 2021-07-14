// utils
const makeValidation = require('@withvoid/make-validation')
// models
const USER_TYPES = require('../models/user.js')
const  User  = require('../models/user.js')
module.exports = {
    onGetAllUsers: async(req, res) => {
        try {
            const users = await User.getUsers();
            return res.status(200).json({ success: true, users })
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },
    onGetUserById: async(req, res) => {
        try {
            const user = await User.getUserById(req.params.id);
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    onCreateUser: async(req, res) => {
        try {
            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    firstName: { type: types.string },
                    lastName: { type: types.string },
                    email: { type: types.string },
                    type: { type: types.enum, options: { enum: USER_TYPES } },
                }
            }));
            if (!validation.success) return res.status(400).json(validation);

            const { firstName, lastName, email, type } = req.body;
            const user = await User.createUser(firstName, lastName, email, type);
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    onDeleteUserById: async(req, res) => {
        try {
            const user = await User.deleteByUserById(req.params.id);
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${user.deletedCount} user.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
}