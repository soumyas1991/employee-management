const express = require('express');
const router = express.Router();

var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { 
            res.send(docs);
        }
        else { 
            console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body)
    var emp = new Employee({
        name: req.body.name,
        phnno: req.body.phnno,
        email: req.body.email,
        department: req.body.department,
        joindate: req.body.joindate,
        enddate:'',
        experience:''
    });
    emp.save((err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { 
            console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc);
        }
        else { 
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    });
});



router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phnno: req.body.phnno,
        email: req.body.email,
        department: req.body.department,
        joindate: req.body.joindate
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { 
            console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.post('/:id', (req, res) => {
   
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var date = (new Date()).toISOString().split('T')[0];
    Employee.findByIdAndUpdate({_id:req.params.id}, {$set: {'enddate':  date+'T00:00:00.000Z'}}, {upsert: true},  (err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { 
            console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc);
        }
        else { 
            console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

module.exports = router;