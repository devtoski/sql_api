const db=require('../confiq/db.confiq')
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, getAll:getAllQuery, updateById:updateByIdQuery, Delete:DeleteQuery } = require('../database/queries');

class User {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
    
    static create=(newUser, result)=> {
        db.query(createNewUserQuery , 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.password,
            ], 
            (err, res)=>{
                if (err) {
                    console.log('error', err)
                    result(err, null)
                    return
                }
                result(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                });
            }
        )
    }
    
    static findByEmail=(email, result)=> {
        db.query(findUserByEmailQuery, [email], (err, res) => {
            if (err) {
                console.log('error', err)
                result(err, null);
                return;
            }
            if (res.length) {
                console.log('found user:', res[0])
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        })
    }
    
    
    
    
    
    static getAll=(result)=> {
        db.query(getAllQuery, (err, res) => {
            if (err) {
                console.log('error', err)
                result(err, null);
                return;
            }
            console.log('users: ', res)
            result(null, res);
        })
    }
    
    static updateById=(id, user, result)=> {
        db.query(updateByIdQuery, [user.id, user.firstname, user.lastname, user.email, user.password, user.create_on, id], (err, res) => {
            if (err) {
                console.log('error', err)
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                console.log({ kind: 'not_found' }, null)
                return;
            }
    
            console.log('updated user', { ...user })
            result(null, {...user});
        })
    }
    
    static delete=(id, result)=> {
        db.query(DeleteQuery, [id], (err, res) => {
            if (err) {
                console.log('error', err)
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null)
                return;
            }
    
            console.log('deleted user with id:', id)
            result(null, res)
        })
    }
}



module.exports = User;