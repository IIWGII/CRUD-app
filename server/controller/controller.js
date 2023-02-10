var Userdb = require('../model/model');

//create and save new user
exports.create=(req,res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({message:'content can not be empty '});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });

    //save user in the database
    user
       .save(user)
       .then(data => {
         res.send(data);
       })
       .catch(err => {
            res.status(500).send({
                message:err.message ||'Some error accurred while create operation'
            })
        });
}
//retrive and return users / retrive and return a single user
exports.find=(req,res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({message:'Not found user with id :'+ id})
                }else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message:err.message ||"Error retriving user with id :"+ id})
            });

    }else {

        
        Userdb.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({message:err.message ||'Error Occured while retrieving user info'});
        });
    }
}
    
    
    //Update a new indentified user by user id
    exports.update=(req,res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message:'content can not be empty'})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if(!data) {
                res.status(400).send({message:`Cannot update user with ${id}. Maybe user not found`})
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Error update user info"})
        });
}

// Delete a user with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id, {useFindAndModify:false})
        .then(data => {
            if(!data) {
                res.status(400).send({message:`Cannot delete user with ${id}. Maybe id is wrong`})

            }else {
                res.send({message:"User was successfully deleted"})
            }
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Could not delete user with id =" + id});
        });

}