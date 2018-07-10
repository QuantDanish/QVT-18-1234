const User = require('../model/user');
const adminUser = require('../config/keys').adminUser; 


module.exports.addAdmin = ()=> {
    return new Promise((resolve, reject) => {
        User.findOne({emailId: adminUser.emailId})
        .then((result) => {
            return result ? resolve() : reject();     
        }).catch((err) => {
            return reject(err);
        });
    
        let admin = new User(adminUser);
    
        admin.save((err)=> {
            return err ? reject() : resolve();
        });
    });
    
}

module.exports.addNewUser = (user)=> {
    return new User(user).save();
}

module.exports.authenticate = (emailId, password)=> {
    return User.findOne({emailId})
    .then((user) => {
        return new Promise( ( resolve, reject )=> {
            // user not found.
            if(!user) return new Promise.reject();
        
            user.comparePassword(password, (err, result)=> {
                return (err || !result ) ? reject(err) : resolve(user);
            });
        });
    }).catch((err) => {reject
        return Promise.reject(err);
    });
}

module.exports.findById = (id) => {
    return User.findById(id);
}