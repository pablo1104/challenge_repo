define(
    ['app', 'underscore', 'marionette', 'views/map-plot', 'handlebars', 'text!templates/mapsTemplate.html', 'google-maps'],
    function(app, _, Marionette, plotItemView, Handleblars, mapsTemplate) {
        var Map = Marionette.CompositeView.extend({
            type: 'handlebars',
            template: Handleblars.compile(mapsTemplate),
            childViewContainer: '#mapContainer',
            childView: plotItemView,
            firstPlot: false,
            ui: {
                mapContainer: '#mapContainer'
            },
            defaults: {
                plots: []
            },
            initialize: function() {
                this.resetMap();
                this.listenTo(app.vent, 'plot:added', this.centralizeMap);
                this.listenTo(this.collection, 'sync', this.resetMap);
                var self2 = this;
                app.vent.on('filter_map:new', function(term) {
                    console.log("Filtering map...." + term);
                    self2.term = term;
                    self2.filter = function(child, index, collection) {
                        //self.resetMap();
                        self2.firstPlot = false;
                        if (self2.term !== "" && self2.term !== undefined && self2.term !== "Select a category") return child.get('category') == self2.term;
                        else return 1;
                    }
                    self2.render();
                    //self.collection.where({category: term});
                });
            },
            //overriding to let subviews know about the map
            //TODO: change it to reduce coupling
            buildChildView: function(item, ItemViewType, itemViewOptions) {
                var options = _.extend({
                    model: item,
                    map: this.map
                }, itemViewOptions);
                var view = new ItemViewType(options);
                return view;
            },
            onRender: function() {
                var self = this;
                console.log("Render map");
                GoogleMapsLoader.KEY = 'AIzaSyBIbh8bNtDlOaY7DWEljz1acEjuITJHDdI';
                GoogleMapsLoader.sensor = false;
                GoogleMapsLoader.load(function(google) {
                    var defaults = {
                        zoom: 5,
                        center: new google.maps.LatLng(51.521862899999995, -0.07246559999999999),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        sensor: false,
                        streetViewControl: false,
                        mapTypeControl: false
                    };
                    self.map = new google.maps.Map(self.ui.mapContainer[0], defaults);
                    google.maps.event.addListener(self.map, 'idle', function() {
                        if (self.firstPlot === false) {
                            self.children.each(function(view) {
                                view.map = self.map;
                                view.renderPlot();
                            });
                            self.firstPlot = true;
                        }
                    });
                });
            },
            resetMap: function() {
                this.plots = [];
            },
            centralizeMap: function(data, e) {
                this.plots.push(data);
                var latlngbounds = new google.maps.LatLngBounds();
                for (var i = 0; i < this.plots.length; i++) {
                    latlngbounds.extend(this.plots[i]);
                }
                this.map.fitBounds(latlngbounds);
            }
        });
        return Map;
    });