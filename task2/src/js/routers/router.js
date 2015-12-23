define(["marionette"], function (Marionette) {
  var Router = Marionette.AppRouter.extend({

    
    /* standard routes can be mixed with appRoutes/Controllers above */
    appRoutes : {
      '': 'defaultRoute',
      "filter/:category": "filterCategory"
    }

  });
 
  return Router;
});