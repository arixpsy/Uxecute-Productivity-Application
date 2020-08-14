<style>
:root {
    --nav-bar-color: #252525;
    --light-grey: #A4A4A4;
    --dark-grey: #404040;
    --blue: #99E1E5;
    --orange: #F2C6B4;
    --red: #FBAFAF;
    --yellow: #F3E8CB;
    --white: whitesmoke;
    --green: #9fe79f;
}

.center_image{
    width: 100%;
    text-align:center;
}
.teckstack__container{
    display: flex;
    border-radius: 25px;
    background-color: whitesmoke;
}
.teckstack__container > .column{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
}
.teckstack__container > .column > a{
    text-decoration: none;
}
.teckstack__container h3 {
    border: none;
    text-align: center;
    margin: 0;
    margin-bottom: 25px;
}

.card{
    --color: var(--dark-grey);
    background-color: var(--white);
    border: 10px solid var(--color);
    border-radius: 15px;
    padding: 5px;
    cursor: pointer;
    transition: all ease-out 0.25s;
    color: var(--dark-grey);
    font-weight: 600;
    display:flex;
    justify-content: center;
    user-select: none;
    width: 200px;
    margin: 10px;
}
.card:hover{
    animation: 0.5s ease-out alternate infinite active;
    background-color: var(--color);
}
@keyframes active {
    from{transform: scale(1);}
    to{transform: scale(1.075);}
}
.card .content{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card.blue{
    --color: var(--blue);
}
.card.red{
    --color: var(--red);
}
.card.yellow{
    --color: var(--yellow);
}
.card.orange{
    --color: var(--orange);
}
</style>

<h1>
    <img height="50" width="50" src="./Uxecute-Application/assets/icons/png/icon.png"> 
    Uxecute Productivity Application
</h1>

## Overview
Uxecute Productivity Application (2020 Summer Side Project)

>Uxecute is a productivity application that allows users to keep track of task with deadlines and bookmark websites which can be easily access later using keyboard shortcuts.

<div class="center_image">
    <img src="./Images/Uxecute-Overview.gif">
</div>

## Motivation

> To be Updated

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
> To be Updated

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

## Credits