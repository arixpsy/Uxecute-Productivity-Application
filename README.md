<h1>
    <img height="50" width="50" src="./Uxecute-Application/assets/icons/png/icon.png"> 
    Uxecute Productivity Application
</h1>

## Overview
Uxecute Productivity Application (2020 Summer Side Project)

>Uxecute is a productivity application that allows users to keep track of task with deadlines and bookmark websites which can be easily access later using keyboard shortcuts.


<img width="100%" src="./Images/Uxecute-Overview.gif">


## Motivation (Developer Dairy)

Currently, I have just finished my second year of university in SMU(Singapore Management University). During my
first year in SMU, I've made about 2 similar applications as the one I've created here. They all function the same
whereby the solution is a dashboard-like application where it tells the time and weather and also features a todo list to manage tasks I do from day to day. 

However, from the 2 I've have made previously there was only one that I use regularly everyday which was a chrome
extension (Not fully developed) that I set as the default homepage for my chrome browser. During the summer of 2020, I really wanted to create and complete a desktop application that can intergrate with my everyday tasks.

This is where I stumbled across Electron JS which allows me to use my Javascript knowledge to build cross platform desktop apps. After, following several tutorials on Youtube, I knew that this was what I needed to create my ideal application.


> Why a desktop application and why fixed the resolution to 800 x 480?



## Tech Stack

<div class="teckstack__container">
    <div class="column">
        <h3>Desktop Application</h3>
        <a target="_blank" href="https://www.electronjs.org/">
            <div class="card blue">
                <div class="content">Electron JS</div>
            </div>
        </a>
        <a target="_blank" href="https://vuejs.org/">
            <div class="card orange">
                <div class="content">Vue JS</div>
            </div>
        </a>
        <a target="_blank" href="https://weatherstack.com/">
            <div class="card red">
                <div class="content">Weather Stack</div>
            </div>
        </a>
    </div>
    <div class="column">
        <h3>Backend API</h3>
        <a target="_blank" href="https://nodejs.org/en/">
            <div class="card yellow">
                <div class="content">NodeJS</div>
            </div>
        </a>
        <a target="_blank" href="https://expressjs.com/">
            <div class="card red">
                <div class="content">Express</div>
            </div>
        </a>
        <a target="_blank" href="https://mongoosejs.com/">
            <div class="card blue">
                <div class="content">Mongoose</div>
            </div>
        </a>
        <a target="_blank" href="https://www.mongodb.com/">
            <div class="card orange">
                <div class="content">MongoDB</div>
            </div>
        </a>
    </div>
</div>

## Functionalities
#### Home Dashboard
> To be Updated
#### Tasks
> To be Updated
#### Links
> To be Updated

## Backend API Reference
#### api/links [GET]
- Get all existing links based on email sent in request query.

#### api/links [POST]
- Create a new link for a user based on link object sent in request body.

#### api/links/{link_id} [PATCH]
- Update an existing link based on ```{link_id}``` and link parameters sent in request body.

#### api/links/{link_id} [DELETE]
- Delete an existing link based on ```{link_id}```.
  
#### api/tasks [GET]
- Get all existing tasks based on email sent in request query.

#### api/tasks [POST]
- Create a new task for a user based on link object sent in request body.

#### api/tasks/{task_id} [PATCH]
- Update an existing task based on ```{task_id}``` and task parameters sent in request body.

#### api/tasks/{task_id} [DELETE]
- Delete an existing task based on ```{task_id}```.

#### api/users/login [POST]
- Return user data based on email and password sent in request body.

#### api/users [POST]
- Create a new user based on the user object sent in request body.

#### api/users/{user_email} [PATCH]
- Update an existing user's settings based on ```{user_email}``` and user parameters sent in request body.

## Installation (Serve Locally, Build)
#### Desktop Application (Windows)
> Make sure to include your own Weather Stack API Key in Uxecute-Application/main.js

> If you have deployed the backend, make sure to also include the deployed link in Uxecute-Application/main.js

```batch
# Running on Localhost
cd Uxecute-Application
npm start

# Build
cd Uxecute-Application
npm run package-win
```

#### Backend API
> Make sure to include your own MongoDB connection string in Uxecute-Backend/app.js

> If you have deployed the backend, make sure to also include the deployed link in Uxecute-Backend/server.js

```batch
# Running on Localhost
cd Uxecute-Backend
npm start
```