import mixin from './utils/mixin';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import _ from 'underscore';
import Promise from 'bluebird';
import Logger from 'js-logger';

const controllerLogger = Logger.get('Controller');

const fixedEncodeURIComponent = function (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
};

const makeQueryString = function(obj) {
  var tokens = [];

  if(_.isEmpty(obj)) {
    return;
  }

  _.each(obj, (value, key) => {
    const encodedValue = fixedEncodeURIComponent(value).replace('%20', '+');
    tokens.push(`${key}=${encodedValue}`);
  });

  return tokens.join('&');
};

class Controller extends mixin(Publisher, Subscriber) {
  constructor(...args) {
    super(...args);
  }

  request(params) {
    let xhr = new XMLHttpRequest();
    const headers = params.headers;
    const data = makeQueryString(params.data) || null;
    const queryString = makeQueryString(params.params);
    const url = _.isEmpty(queryString) ? params.url : `${params.url}?${queryString}`;

    return new Promise(function(resolve, reject) {
      xhr.open(params.method, url, params.isAsync || true);

      if(params.mimeType) {
        xhr.overrideMimeType(params.mimeType);
      }

      if(_.isArray(headers)) {
        headers.forEach(function(header) {
          xhr.setRequestHeader(header.header, header.value);
        });
      }

      if(params.responseType) {
        xhr.responseType = params.responseType;
      }

      xhr.send(data);

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText, xhr);
          controllerLogger.info(`Request to ${params.url} succeeded.`);
        } else {
          reject(new Error('The server returned a 400 status or higher.'));
          controllerLogger.error('An error with the request occurred');
        }
      };

      xhr.onerror = function() {
        reject(new Error('An error occured with the request.'));
        controllerLogger.error('An error with the request occurred');
      };

    }).cancellable().catch(Promise.CancellationError, function(e) {
      xhr.abort();
      controllerLogger.error(e);
    });
  }

  get(url, params) {
    if(_.isObject(url)) {
      url.method = 'GET';
      return this.request(url);
    }

    return this.request({
      method: 'GET',
      url: url,
      params: params
    });
  }

  post(url, data) {
    if(_.isObject(url)) {
      url.method = 'POST';
      return this.request(url);
    }

    return this.request({
      method: 'POST',
      url: url,
      data: data,
      headers: [{
        header: 'Content-Type',
        value: 'application/x-www-form-urlencoded; charset=UTF-8'
      }]
    });
  }

  put(url, data) {
    if(_.isObject(url)) {
      url.method = 'PUT';
      return this.request(url);
    }

    return this.request({
      method: 'PUT',
      url: url,
      data: data
    });
  }

  delete(url) {
    if(_.isObject(url)) {
      url.method = 'DELETE';
      return this.request(url);
    }

    return this.request({
      method: 'DELETE',
      url: url
    });
  }

  emit(topic, data) {

  }

  on(topic, callback) {

  }
}

export default Controller;
