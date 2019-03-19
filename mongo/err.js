module.exports = (Users) => {
    Users.post('save', (error, res, next)=>{
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if(error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    // Users.pre('save', next => {
    //     if(!this.id) {
    //         throw 'ID Not Found!'
    //     }
    //     if(!this.passwd) {
    //         throw 'Password Not Found!'
    //     }
    //     if(!this.name) {
    //         throw 'Name Not Found!'
    //     }
    // })
}