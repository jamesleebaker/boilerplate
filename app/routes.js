import indexController from 'controllers/indexController';

const routes = {
  // TODO: find a way to remove binding
  '/': indexController.default.bind(indexController)
};

export default routes;
