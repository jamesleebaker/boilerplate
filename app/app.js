import Router from './router';
import $ from 'jquery';
import styles from 'styles/app';
import template from 'templates/views/index';

var container = document.querySelector('#main-wrapper');
container.innerHTML = template({ name: 'James' });

module.exports = {
  test: function() {
    return 42;
  }
};