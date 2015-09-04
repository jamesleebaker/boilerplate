import Logger from 'js-logger';

(function(window) {

  // Unhandled Promise Rejection Handler
  window.addEventListener("unhandledrejection", function(e) {
    e.preventDefault();
    const reason = e.detail.reason;
    const promise = e.detail.promise;

    Logger.error(`Promise rejection [was not handled]: ${reason}`);
  });

  // Any Promise Rejection Handler
  window.addEventListener("rejectionhandled", function(e) {
    e.preventDefault();
    const reason = e.detail.reason;
    const promise = e.detail.promise;

    Logger.error(`Promise rejection: ${reason}`);
  });

})(window);
