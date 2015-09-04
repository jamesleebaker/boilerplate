##Lacking
* Getting environment config into client
* Write a sample mock [https://www.npmjs.com/package/pretender] and test it
* Can I test handlebars templates against JSON fixtures?
* HTML/JSON fixtures for karma w/ jasmine
* Socket.io support
  * Controller.sendRequest - supports traditional requests and socket.io
* Any other necessary express middleware?
* Considering end-to-end tests, acceptance tests, and integration tests
* Look into image compression, spriting, and more
* Security mechanisms - evaluate which are needed for client-side application
  * Cross Site Request Forgery
  * Content Security Policy
  * X-Frame
  * p3p
  * hsts
  * xssProtection
  * Maybe look at Lusca from KrakenJS?
* Debugging Panel w/ localStorage or cookie for activation, spanning across
  * Logger
  * Handlebars context
  * Performance (need to add timers into lib files)
* Generators
  * Model
  * Route
  * Controller
  * View/Partials
* Yeoman generator
* https://docs.npmjs.com/cli/shrinkwrap for production deployment
* Abstraction into node modules

##Done
* Data Binding (via Object.observe polfill & Event Bus)
* MVC pattern (base objects)
* Handling vendor scripts and stylesheets
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
* Decorators

##Can't Do/Need More Info
* HTMLBars
* Web Components in Handlebars

###Deployment
To deploy, enter the following commands on the production machine:
```
export NODE_ENV=production
npm deploy
```
