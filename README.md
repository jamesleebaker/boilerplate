##Lacking
* Write a sample mock [https://www.npmjs.com/package/pretender] and test it
* https://docs.npmjs.com/cli/shrinkwrap for production deployment
* Getting environment config into client
* Can I test handlebars templates against JSON fixtures?
* HTML/JSON fixtures for karma w/ jasmine
* Client-side components:
  * Data Binding
  * MVC pattern (base objects)
  * Decorators
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
* Security mechanisms - evaluate which are needed for client-side application
  * Cross Site Request Forgery
  * Content Security Policy
  * X-Frame
  * p3p
  * hsts
  * xssProtection
  * Maybe look at Lusca from KrakenJS?

##Done
* Getting unit testing set up
* Favicon with Express
* Add environment configs and pull with nconf into Gulpfile and server.js
* Copy images in the build process to the build folder
* Move templates into app/templates and update webpack configs
* Build basic PageView class in app/lib. IndexView will extend from PageView
* Event loop, bus, or pub/sub pattern
* Event logging
* Router
* Numbers library
* Date Library
* Mixins

###Deployment
To deploy, enter the following commands on the production machine:
```
export NODE_ENV=production
npm deploy
```
