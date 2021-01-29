const User = require('./db');

const createUser = async(user, pass) => {
    const newUser = new User({
        username: user,
        password: pass
    });
    try {
        await newUser.save();
        return true;
    } catch (error) {
        return false;
    }
}

const comparePassword = (pass, savedPass) => {
    if(pass == savedPass){
        return true;
    } else {
        return false;
    }
}

const getUsers = async(user, pwd, next) => {
    // try {
        return await User.find({username: user});
    //     console.log(userName, ")))))))))((((");
    //     if(userName){
    //         const pass = comparePassword(pwd, userName.password);
    //         if(pass){
    //             return userName;
    //         }
    //     }
    // } catch (error) {
    //     return null;
    // }
}

module.exports = {
    createUser,
    getUsers,
    comparePassword
}