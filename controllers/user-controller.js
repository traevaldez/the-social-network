const { User } = require('../models');

const userController = {

    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Get one user by :id
    getUserById({ params }, res) {
        User.findOne({ _id: User.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            

            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // Create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // Update user by :id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: User.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
            console.log(dbUserData)
    },

    // Delete user
    deleteUser({ params, User }, res) {
        User.findOneAndDelete({ _id: User.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // Delete user and thoughts associated with user account
    // deleteUser({ params }, res) {
    //     Thought.deleteMany({ userId: params.id })
    //         .then(() => {
    //             User.findOneAndDelete({ userId: params.id })
    //                 .then(dbUserData => {
    //                     if(!dbUserData) {
    //                         res.status(404).json({ message: 'No user found with this id!' });
    //                         return;
    //                     }
    //                     res.json(dbUserData);
    //                 });
    //             })
    //             .catch(err => res.json(err));
    // },

    // /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController;