## Face Detection AI Full stack App

### Description

This web app uses React.js for frontend and Node.js + Express.js server at the backend and I have used postgresSQL to manage users, the app uses Redis to session management, redis sends a JWT that gets stored on the session storage of browser and user can log back in without having to sign in everytime. The app also used AWS's Lambda function to generate the badges, where each time user makes a search request he will get a badge ranging from [😃', '😄', '😀', '😊' , '😉', '😍', '🔵', '🟡', '💖']. The score 10+ will have a contant badge of 💖. The app allows to renaming of the name from 'View Profile' and add pet name and age.

[Backend's Link](https://github.com/ajayjarhad/face_recognition_ai_backend)


To test the app you can use the following login credentials 
```sh
username: admin@email.com
password: pass
```
Or you can register as a new user 😊

### API's used
Clarify

### How to Builld
Run Script
```sh
$ npm start
```
Production build script
```sh
$ npm build
```

### Lambda Function I have used
```sh
'use strict';

const emoji = [
  '😃', '😄', '😀', '😊' , '😉', '😍', '🔵', '🟡', '💖'
]


module.exports.rank = async event => {
  const rank = event.queryStringParameters.rank;
  const rankEmoji = emoji[rank > emoji.length ? emoji.length - 1 : rank];
  return {

    statusCode: 200,
    headers:{
         "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: rankEmoji
      },
      null,
      2
    ),
  };

```

This project is hosted on netlify (Pretty cool host to host JAM stack website) and backend is hosted on AWS.
