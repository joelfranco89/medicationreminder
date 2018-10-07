var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Reminder = require('./backend/model'),
    nodemailer = require('nodemailer'),
    path = require('path')

var db = mongoose.connect('mongodb://joel:player73189@ds119523.mlab.com:19523/reminderform', {useNewUrlParser: true});

var app = express()
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/dist/medicationReminder'));


app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/*', function(req,res) {   
    res.sendFile(path.join(__dirname+'/dist/medicationReminder'));
});


app.get('/api/getReminder', function(req, res){
    Reminder.find({}, function(err, reminders){
        if (err){
            res.send(err);
        }else{
            res.send(reminders);
        }
    })
});

app.post('/api/saveReminder', function(req, res){
    var newReminder = new Reminder(req.body);

    Reminder.create(newReminder, function(err, reminder){
        if (err){
            res.send(err);
        }else{
            res.send(reminder);
            console.log('new reminder: ' + reminder);
        }
    })

    //Email message body configuration
    function emailMessage(){
        if (req.body.frequency == 'Hourly'){
            return 'Hello ' + req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1) + '!\n\n' + 
            'You will be reminded every ' + req.body.timeLine + ' hours via email to take your ' + req.body.medicineName + '.';       
        }else{
            return 'Hello ' + req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1) + '!\n\n' +
            'You will be reminded every ' + req.body.timeLine + ' minutes via email to take your ' + req.body.medicineName + '.'; 
        }
    }

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: 'joel.franco0789@gmail.com',
            pass: 'player73189'
            }
        });
        
        var mailOptions = {
            from: 'joel.franco0789@gmail.com',
            to: req.body.email,
            subject: 'Thank you for using Franco Apps for your medicine reminders',
            text: emailMessage()        
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });



   

});

function sendingEmails(){
    Reminder.find({}, function(err, reminder){
        reminder.forEach(function(reminder){
            function sendEmail(){
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                    user: 'medicationreminderapp5@gmail.com',
                    pass: '123Qwert!'
                    }
                });
                
                var mailOptions = {
                    from: 'medicationreminderapp5@gmail.com',
                    to: reminder.email,
                    subject: 'Friendly medicine reminder from Franco Apps',
                    text: 'Hello ' + reminder.firstName + '!\n\n' + 
                          'Please remember to take your medicine..\n\n' +
                          reminder.medicineName + ' , ' + reminder.amountOfPills + ' pills.\n\n' +
                          'To remove this reminder, click on the link below\n\n' +
                          'http://localhost:8080/api/removereminder/' + reminder._id      
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            }

            function frequencySelectedForSendingEmail(){
                if (reminder.frequency == 'Houry'){
                    return reminder.timeLine * 3600000;
                }else if (reminder.frequency == 'Every Minute'){
                    return reminder.timeLine * 60000;
                }
            }

            if ( reminder.timeSinceLastReminder + frequencySelectedForSendingEmail() <= Date.now() ){
                sendEmail();
                reminder.timeSinceLastReminder = Date.now();
                reminder.save();
            }

        });
    })
}

app.get('/api/removereminder/:id', function(req, res){
    console.log(req.params.id);
    Reminder.deleteOne({_id: req.params.id}, function(err){
        if (err){
            res.send(err);
        }else{
            res.redirect('http://localhost:4200');
        }
    })
});



setInterval(sendingEmails, 1000);


const port = process.env.PORT || 8080;



app.listen(process.env.PORT || 8080)