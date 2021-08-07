const { findOne } = require('../models/UserSchema');
const User = require('../models/UserSchema');

module.exports.availableUserName = async (req,res) => {
    const {username} = req.query;

    let user = await User.findOne({username})
    if(user === null) {
        return res.status(200).send({usernameAvailable: true})
    }
    return res.status(200).send({usernameAvailable: false})
}