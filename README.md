# freeCodeCamp Back End Development and APIs Certification Projects
My solutions for the projects required to receive the [Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/) 
on [freeCodeCamp.org](https://www.freecodecamp.org).

1. Timestamp Microservice - [Project Instructions](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice) |
[View Source Code](https://github.com/carterldavis2002/fcc-backend-apis-projects/tree/master/fcc-timestamp) | 
[Run on Glitch](https://fcc-backend-apis-timestamp.glitch.me/)
2. Request Header Parser Microservice - [Project Instructions](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/request-header-parser-microservice) | 
[View Source Code](https://github.com/carterldavis2002/fcc-backend-apis-projects/tree/master/fcc-req-header-parser) | 
[Run on Glitch](https://fcc-backend-apis-req-header.glitch.me/)
3. URL Shortener Microservice - [Project Instructions](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) | 
[View Source Code](https://github.com/carterldavis2002/fcc-backend-apis-projects/tree/master/fcc-url-shortener) | 
[Run on Glitch](https://fcc-backend-apis-url-shortener.glitch.me/)
4. Exercise Tracker - [Project Instructions](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker) | 
[View Source Code](https://github.com/carterldavis2002/fcc-backend-apis-projects/tree/master/fcc-exercise-tracker) | 
[Run on Glitch](https://fcc-backend-apis-exercise-tracker.glitch.me/)
5. File Metadata Microservice [Project Instructions](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/file-metadata-microservice) | 
[View Source Code](https://github.com/carterldavis2002/fcc-backend-apis-projects/tree/master/fcc-file-metadata) | 
[Run on Glitch](https://fcc-backend-apis-file-metadata.glitch.me/)

## Certificate
<p align="center"><a href="https://www.freecodecamp.org/certification/carterldavis2002/back-end-development-and-apis">Certificate link</a></p>
<p align="center">
<img width="600px" height="465px" src="https://github.com/carterldavis2002/fcc-backend-apis-projects/blob/master/certificate.PNG">
</p>

## Running the Projects Locally
### Requirements
- Git
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download) (for URL Shortener Microservice and Exercise Tracker)

Clone the repo
```
git clone https://github.com/carterldavis2002/fcc-backend-apis-projects.git
```
In the directory of the desired project to run, install the associated dependencies
```
npm install
```
To start the express server, run ``npm start`` and navigate the browser to [http://127.0.0.1:PORT/](http://127.0.0.1:3000/). The PORT used by the server is 3000 by default but can be changed by
assigning the PORT environment variable to a different value.

**NOTE:** To start the server without error for the URL Shortener and Exercise Tracker projects, the MONGO_URI environment variable must be assigned to a valid
MongoDB URI connection string.
