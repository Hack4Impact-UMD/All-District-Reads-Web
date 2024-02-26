# All-District-Reads-Web
There are two main purposes of building the web version of the app - for the ADR Staff & School Systems Staff.

Database plan - https://docs.google.com/document/d/1xxaeg50WpvHJY1tGQUxQrErSksQY34WdJGlrjivC8uI/edit?usp=sharing 

## Functionality to implemennt for the ADR Staff

- Add pre and post reading surveys for parents to fill out
- Measure survey reponses 
- Add acknowledgement forms for parents to fill out
- Measure parents' acknowledgments of doing the reading assignments

## Functionality to implement for the School Staff

- Upload a reading schedule (a form kind of thing)
- Upload content trivia questions
- Provide links to audio/video clips of book readings
- Set reminders and notifications for parents
    - Complete reading
    - Complete survey
    - Donate to ADR

## Codebase 
Two main folders, client and api.

### Pages to create 
We will change it later on as per the design team's plan. This is just so we get a sense of direction on what steps to take next.

- Login/Registeration
- Home 
- Pre Survey (static)
- Post Survey (static)
- Acknowledgment form (create page)
- Trivia questions (create page)
- Reading schedule (create page)
- Reading schedule (view page - this would be the same thing that the parents would see)
- Reminders (create page)
- A form page where they can add audio/video clips (create page)

Note: By "create page", I mean the pages which include the functionality for the staff to create and customize a certain feature. 

## Tasks
We have a team of three engineers for the web version. For the first week, we need someone to do the following things

- Set up the login/registeration page and set up authentication.
- Create a way to set and update the reading schedule.
- Create pre survey, post survey pages, questions are below (These are the questions that the NPO  gave us). We could also add a feature for them to be able to edit these questions.

    PRE Program

        How often does our family read together?
        A) Daily	B) Weekly	C) Monthly	D) We don’t read together

        How often does my child read for pleasure?
        A) Daily	B) Weekly	B) Monthly	D) Not at all

        My child enjoys reading books for pleasure:
        A) A great deal	B) Some	C) A little	D) Not at all

        How important is it that my child enjoys reading?
        A) A great deal	B) Some	C) A little	D) Not at all

        Do you believe a program that encourages families reading together would affect my child’s reading enjoyment?
        A) Yes 	 	B) No		C) Not sure 


    POST Program	 

        How often does our family read together?
        A) Daily	B) Weekly	C) Monthly	D) We don’t read together

        How often does my child read for pleasure?
        A) Daily	B) Weekly	B) Monthly	D) Not at all

        My child enjoys reading books for pleasure:
        A) A great deal	B) Some	C) A little	D) Not at all

        How important is it that my child enjoys reading?
        A) A great deal	B) Some	C) A little	D) Not at all

        Do you believe the ALL DISTRICT READS program has encouraged my child’s reading enjoyment?
        A) Yes 	 	B) No		C) Not sure 



