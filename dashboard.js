const express = require('express');
var allstudents=require(/* absolute path for overallstudents.json */);
var allcourses=require(/* absolute path for availablecourses.json */);
const app = express();

app.set('views','./views');
app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

regno='';
flag=-1;
name='';

//Dashboard

app.post("/", function(req, res){
    regno=req.body.regno;
    password=req.body.password;

    for(var i=0; i<allstudents.length; i++)
    {
        if(allstudents[i].regno.toLowerCase() === regno.toLowerCase() && allstudents[i].password === password)
        {    
            flag=i;
            name=allstudents[i].name;
            break;
        }
    }

    if(flag==-1)
        res.status(404).write("<br><br><br><br><br> <div style=\'text-align:center;\'> <h1>Unsuccessful Login! :(</h1> <br><br> <h2>Invalid Registration no. / Password!</h2> </div>");
    else
        res.render('dashboard', {name: name});
});

app.get("/", function(req, res){
    res.render('dashboard', {name: name});
});

//To display all the available courses

app.get("/courses", function(req, res){
    res.render('courses', {data: allcourses});
});

// To display the student's profile

app.get("/profile", function(req, res){
    res.render('profile', {data: allstudents[flag]});
});

// To display the courses registered by the student

var displaycourses=[];
app.get("/show_registered", function(req, res){
    displaycourses=[];
    cc=courses_registered_by_each_student[flag].coursecodes;
    for(j of cc)
    {
        for(var i=0; i<allcourses.length; i++)
        {
            if(j==allcourses[i].code)
                displaycourses.push(allcourses[i]);
        }
    }
    
    res.render('show_registered', {data: displaycourses, name: name})
});

// To register for a new course

app.get("/register", function(req, res){
    res.render('register', {name: name});
});

// To display the registered course / error

app.post("/register_request", function(req, res){
    var course_exists=false;
    var index;
    for(var i=0; i<allcourses.length; i++)
    {
        if(allcourses[i].code==req.body.coursecode)
        {    
            course_exists=true;
            index=i;
        }
    }

    res.setHeader('Content-type','text/html');

    if(course_exists==false)
    {
        res.status(404).write("<br><br><br><br><br> <div style=\'text-align:center;\'> <h1>Unsuccessful! :(</h1> <br><br> <h2>Course not found!</h2> </div>");
        res.write('<br><br> <h3 style=\'text-align:center;\'> <a href=\'/dashboard\'>Click here</a> to return to Dashboard!</h3>');
    }

    else
    {
        console.log("Valid Course!");
        console.log(allstudents[flag]);
        console.log(courses_registered_by_each_student[flag]);

        if(courses_registered_by_each_student[flag].coursecodes.indexOf(req.body.coursecode) !== -1)
        {    
            res.status(404).write("<br><br><br><br><br> <div style=\'text-align:center;\'> <h1>Unsuccessful Registration! :(</h1> <br><br> <h2>The course is already registered!</h2> </div>");
            res.write('<br><br> <h3 style=\'text-align:center;\'> <a href=\'/dashboard\'>Click here</a> to return to Dashboard!</h3>');
        }
        else
        {
            console.log("Course "+req.body.coursecode+" has not been registered by the student! Registering it now! ");
            courses_registered_by_each_student[flag].coursecodes.push(req.body.coursecode);

            res.render('registration_success', {name: name, data: allcourses[index]});
        }
    }
});

// To de-list an already registered course

app.get("/delist", function(req, res){
    res.render('delist', {name: name});
});

// To display the de-listed course / error

app.post("/delist_request", function(req, res){
    var course_exists=false;
    var index;
    for(var i=0; i<allcourses.length; i++)
    {
        if(allcourses[i].code==req.body.coursecode)
        {    
            course_exists=true;
            index=i;
        }
    }

    res.setHeader('Content-type','text/html');

    if(course_exists==false)
    {
        res.status(404).write("<br><br><br><br><br> <div style=\'text-align:center;\'> <h1>Unsuccessful! :(</h1> <br><br> <h2>Course not found!</h2> </div>");
        res.write('<br><br> <h3 style=\'text-align:center;\'> <a href=\'/dashboard\'>Click here</a> to return to Dashboard!</h3>');
    }
    else
    {
        console.log("Valid Course!");
        console.log(allstudents[flag]);
        console.log(courses_registered_by_each_student[flag]);

        if(courses_registered_by_each_student[flag].coursecodes.indexOf(req.body.coursecode) !== -1)
        {    
            console.log("Course "+req.body.coursecode+" has been registered by the student! Removing it now! ");

            for(var i=0; i<courses_registered_by_each_student[flag].coursecodes.length; i++)
            {
                if(courses_registered_by_each_student[flag].coursecodes[i] == req.body.coursecode)
                    courses_registered_by_each_student[flag].coursecodes.splice(i, 1);
            }

            res.render('delist_success', {name: name, data: allcourses[index]});
        }
        else
        {
            res.status(404).write("<br><br><br><br><br> <div style=\'text-align:center;\'> <h1>Unsuccessful De-listing! :(</h1> <br><br> <h2>The course is not registered for it to be de-listed!</h2> </div>");
            res.write('<br><br> <h3 style=\'text-align:center;\'> <a href=\'/dashboard\'>Click here</a> to return to Dashboard!</h3>');
        }
    }
});

// To Logout

app.get('/logout', function(req, res){
    delete name;
    delete flag;
    delete regno;
    res.redirect('http://localhost:4000');
});

module.exports=app;
