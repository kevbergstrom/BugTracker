# BugTracker
<p align="center">
  <img src="https://github.com/kevbergstrom/BugTracker/blob/master/logoFinal.png" alt="BugTracker" width="407px" height="277px" />
</p>

## Description
BugTracker is a React app for tracking bugs in projects. It is more of a proof of concept than a fully fledged app. BugTracker offers a more simplified approach to bug tracking. It uses a project focused model where projects work as groups with users as the members. The members then have access to the project's bugs and can discuss and fix them through individual comment boards.
## Features
* User Profiles
* User Sessions
* Public and Private Projects
* Bug Posts
* Comment Board
* Favoriting
* Project Invites
* Project and Bug Searching
* Virtual Tour Mode
  
To view a live demo, [click here](https://github.com)  
To take a virtual tour, [click here](https://github.com)
## How To Use

Install the frontend and backend directories using npm
```bash
# Install dependencies
npm install
npm install --prefix ./client
```

Set the environment variables in `evars.sh` and run it (Requires a MongoURI)
```bash
# Set environment variables
source evars.sh
```

Start the development server using npm
```bash
# Start development server
npm run dev
```

Go to `https://localhost:3000/` once the development server has started to view the app

## Technologies Used
[React](https://reactjs.org) - Frontend Framework  
[Express](https://www.npmjs.com/packages/express) - Backend Framework  
[Nodejs](https://nodejs.org/en/) - Backend Environment  
[MongoDB](https://www.mongodb/com) - Database
## Authors
[Kevin Bergstrom](https://github.com/kevbergstrom)
## License
This project is licensed under the MIT License
