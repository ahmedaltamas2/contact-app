const express = require('express');
const path  = require('path');
const port = 8000;


const db =  require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name : "altamas",
        phone: "5454545454"
    },

    {
        name: "tasbiya",
        phone: "15515151"
    },

    {
        name: "elham",
        phone: "5454545"
    }
]


app.get('/',function(req,res){
    

    Contact.find({}, function(err,contacts){
        if(err){
        console.log('error in fecthing db');
        return;
    }
    return res.render('home',{
        title: "my contact list",
        contact_list: contacts
    });
   
    
    
});



   
});

// app.get('/practice',function(req,res){
    
//     return res.render('practice',{title: "lets playyyyyyyyy"});
// });

app.post('/create-contact',function(req,res){

    // contactList.push(req.body);

    Contact.create({
        name : req.body.name,
        phone: req.body.phone
    } , function(err,newContact){

        if(err) {
            console.log('error in creating a contact');
            return;
        }

        console.log('*****',newContact);
        return res.redirect('back');
    }

    );
    // return res.redirect('back');
});


app.get('/delete-contact',function(req,res){
    // let phone = req.query.phone;
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting object from db');
            return;
        }

        return res.redirect('back');

    });


    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1)
    // {
    //     contactList.splice(contactIndex,1);
    // }

});






app.listen(port, function(err){
    if(err){
        console.log("error in running ",err);
    }

    console.log('my server is running', port);
});