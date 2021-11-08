const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://soumya1991:soumya1991@cluster0.nloqw.mongodb.net/EmpManagement', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});
module.exports = mongoose;