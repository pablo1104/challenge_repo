define(
  function(require){
  	var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var Router = require ('routers/router');
	var CrimeApp = new Marionette.Application(
	{
		initialize : function(options) {
             //TODO: code to initialize
            
			var router = new Router({
		        controller : this
		  	}); 
         },


        defaultRoute :  function () {
            
        },
        filterCategory : function(category)
        {
        	console.log("Filter " +  category);
        	this.init_filter = category;
   			this.vent.trigger('filter:new', category);
	  		this.vent.trigger('filter_map:new', category);
        },
    });

	CrimeApp.addRegions({
	  filters: "#filters",
	  items: "#items",
	  map: "#maps"
	});

	CrimeApp.addInitializer(function(options){
		  

	  
	});

	
	CrimeApp.on("start", function(){
	      // Start Backbone history a necessary step for bookmarkable URL's
	      

	      Backbone.history.start();
	 });
	//CrimeApp.start();
	console.log(CrimeApp);
	
	return CrimeApp;

});