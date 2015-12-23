require.config({
  paths : {
    jquery     : '../assets/lib/jquery.min',
    underscore : '../assets/lib/underscore-min',
    json2 : '../assets/lib/json2.min',
    backbone   : '../assets/lib/backbone-min',
    marionette : '../assets/lib/backbone.marionette.min',
    handlebars : '../assets/lib/handlebars',
    'google-maps': '../assets/lib/Google.min',
    templates: '../templates'
  },

  shim : {
    '../assets/lib/backbone.LocalStorage' : ['backbone'],
    underscore : {
      exports : '_'
    },
    backbone : {
      exports : 'Backbone',
      deps : ['jquery','underscore']
    },
    marionette : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    },
    json2:
    {
      exports: "JSON"
    }
  },
  deps : ['jquery','underscore']
});

require(['backbone','app', 'views/filters', 'collections/crimes', 'views/crimes', 'views/maps','routers/router'],
  function(Backbone, app, FiltersView, Crimes, CrimesView, myMapView, Router){
 
  crimes = new Crimes();
    crimes.fetch({
        success : function(crimes, response, options) {
             
             crimesView = new CrimesView({ collection: crimes });
             


             mapView = new myMapView({collection: crimes, plots:[]});
             filterView = new FiltersView({options_cats:crimesView.categories});
             


             app.items.show(crimesView);
             app.filters.show(filterView);
             app.map.show(mapView);

             
        }
    });
  


  app.start();

  return app;

  /*new Router({
    controller : Controller
  });
  Backbone.history.start();*/
});
