define(
  ['app','jquery','underscore','backbone','marionette','handlebars','text!templates/filtersTemplate.html' ],
  function(app, $, _, Backbone, Marionette, Handleblars, FilterTemplate){

  	Handleblars.registerHelper('equal', function(lvalue, rvalue, options) {
  		
	    if (arguments.length < 3)
	        throw new Error("Handlebars Helper equal needs 2 parameters");
	    if( lvalue!=rvalue ) {
	        return options.inverse(this);
	    } else {
	        return options.fn(this);
	    }
	});

	var FiltersView = Marionette.ItemView.extend({
	  type: 'handlebars',
	  template: Handleblars.compile(FilterTemplate),

	  className: 'filters',
	  defaults:{
	  	selected:""
	  },
	  events: {

	  },
	  ui: {
            category: '[name=category]'
      },
	  initialize: function(){
	  	var self = this;
	  	console.log(app.init_filter);
	  	if(app.init_filter != undefined){
	  		self.selected =app.init_filter;
	  		app.vent.trigger('filter:new', app.init_filter);
	  		app.vent.trigger('filter_map:new', app.init_filter);
	  	}

	    app.vent.on('filter:new', function (term){
                console.log(term);
                self.selected = term;
				self.render();
    
            });
	  },
	  events: {
            'submit':'filter'
        },
	  serializeData: function(){
	  	 
	    viewData = { name: 'Pablo Alba', options_cats: this.options.options_cats, selected: this.selected };
	    
	    return viewData;
	  },

	  filter:function(e){
	  	var cat = this.ui.category.val();
	  	e.preventDefault();
	  	console.log(app.init_filter);

	  	Backbone.history.navigate("filter/" + cat);

	  	app.vent.trigger('filter:new', cat);
	  	app.vent.trigger('filter_map:new', cat);

	  }		  

	});

	return FiltersView;

});