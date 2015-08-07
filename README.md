##Lacking
* Can I test handlebars templates against JSON fixtures?
* HTML/JSON fixtures for karma w/ jasmine
* Client-side components:
  * Router
  * Data Binding
  * Numbers library
  * Date Library
  * MVC pattern (base objects)
  * Mixins & Decorators
  * Event loop, bus, or pub/sub pattern
  * Event logging
* Generators
  * Model
  * Route
  * Controller
  * View/Partials
* Socket.io support
* Handling vendor scripts and stylesheets
* HTMLBars
* Web Components
* Any other necessary express middleware?
* Considering end-to-end tests, acceptance tests, and integration tests
* Look into image compression, spriting, and more
* Yeoman generator
* Abstraction into node modules

##Done

* Getting unit testing set up
* Favicon with Express
* Add environment configs and pull with nconf into Gulpfile and server.js
* Copy images in the build process to the build folder

###Deployment
To deploy, enter the following commands on the production machine:

```export NODE_ENV=production```
```webpack -p --config webpack.production.config.js```
