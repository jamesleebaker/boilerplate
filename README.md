##Lacking
* [DONE] Getting unit testing set up
* Considering end-to-end tests, acceptance tests, and integration tests
* [DONE] Favicon with Express
* Any other necessary middleware
* Add environment configs and pull with nconf into Gulpfile and server.js
* Add gulp-if for Gulpfile
* [DONE]Copy images in the build process to the build folder
* Look into image compression, spriting, and more
* Convert Gulpfile.js to ES6

##Stuctrual Needs
* Assume all content in repo will be in a client folder in a client-server ecosystem
* server.js file for starting client-side web server
* package.json for app meta and node dependencies
* index.html - initial HTML page loaded
* Gulpfile.js - compiling and other task scripting
*

###Deployment
To deploy, enter the following commands on the production machine:

* export NODE_ENV=production
* webpack -p --config webpack.production.config.js