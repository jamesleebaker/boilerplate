import indexController from 'controllers/indexController';

const routes = {
  '/': indexController.default.bind(indexController)
};

export default routes;
