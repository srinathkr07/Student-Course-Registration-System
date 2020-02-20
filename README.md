# Student-Course-Registration-System
A small and a simple Student Course Registration System built using **Node.js and Express.js** as the mid-term assignment during PayPal India's Value Added Program (VAP) in VIT Chennai. 

To start the application, give the absolute path of the two JSON files **availablecourses.json** and **overallstudents.json** in **dashboard.js**, run **app.js** and open http://localhost:4000 in the browser. 

availablecourses.json contains the small set of available courses that the students can register. It contains the details of 7 courses such as course name, course code and slot. 

overallstudents.json contains the small set of students who are the users of this application. It contains the details of 6 students such as Registration no., Password (both of which are used as login credentials), Name, CGPA and Type of student (Day Scholar or Hosteller). 

Once the student has logged in, he/she can: \
(i) view the list of courses that are available for registration, \
(ii) view the courses that he/she has already registered (which is a static one, as of now, and can be changed in app.js), \
(iii) view his/her profile, \
(iv) register a new course, and \
(v) de-list (remove) a registered course. 

The template engine using in this application to generate HTML is **Pug**. 
