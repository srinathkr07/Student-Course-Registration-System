const express = require('express');
const app = express();

const dashboard=require('./dashboard');
app.use('/dashboard', dashboard);

app.set('views','./views');
app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

courses_registered_by_each_student=[
    { regno: "17BCE1001", coursecodes: ["CSE4020", "CSE3024"] },
    { regno: "17BCE1002", coursecodes: ["CSE4015", "CSE3024", "CSE3021"] },
    { regno: "17BCE1003", coursecodes: ["CSE4022", "CSE3020"] },
    { regno: "17BCE1004", coursecodes: ["CSE3025", "CSE3021"] },
    { regno: "17BCE1005", coursecodes: ["CSE3025", "CSE4022", "CSE3021"] },
    { regno: "17BCE1006", coursecodes: ["CSE4015"] }
]

app.get("/", function(req, res){
    res.render('login');
});

app.listen(4000);