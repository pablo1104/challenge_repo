define(
    ['app', 'underscore', 'marionette', 'handlebars', 'text!templates/plotTemplate.html', 'google-maps'],
    function(app, _, Marionette, Handleblars, plotTemplate) {
        //console.log(google);
        var PlotItem = Marionette.ItemView.extend({
            type: 'handlebars',
            template: Handleblars.compile(plotTemplate),
            initialize: function() {
                this.listenTo(this.model, 'change:selected', this.onChangeSelected);
            },
            //overriding default render method
            //the only change here is the call for renderPlot instead of this.$el.html(html);
            render: function() {
                this.isClosed = false;
                this.triggerMethod("before:render", this);
                this.triggerMethod("item:before:render", this);
                var data = this.serializeData();
                data = this.mixinTemplateHelpers(data);
                var template = this.getTemplate();
                this.html = Marionette.Renderer.render(template, data);
                var self = this;
                //only change if compared with the original render from marionete itemView
                //this.renderPlot(html);
                this.bindUIElements();
                this.triggerMethod("render", this);
                this.triggerMethod("item:rendered", this);
                return this;
            },
            renderPlot: function() {
                var id = this.options.model.get('id');
                var rnd_vr = Math.random() / 1000;
                var lat = parseFloat(this.options.model.get('location').latitude) + rnd_vr;
                rnd_vr = Math.random() / 1000;
                var log = parseFloat(this.options.model.get('location').longitude) + rnd_vr;
                // return false;
                if (id !== "" && id != undefined) {
                    var position = new google.maps.LatLng(lat, log);
                    this.marker = new google.maps.Marker({
                        position: position,
                        map: this.map,
                        title: '',
                        animation: google.maps.Animation.DROP
                    });
                    this.infowindow = new google.maps.InfoWindow({
                        content: this.html
                    });
                    //events to sync the plot and the item on the result list
                    google.maps.event.addListener(this.marker, 'click', this.select.bind(this));
                    google.maps.event.addListener(this.marker, 'select', this.open.bind(this));
                    google.maps.event.addListener(this.marker, 'close', this.close.bind(this));
                    google.maps.event.addListener(this.infowindow, 'closeclick', this.select.bind(this));
                    app.vent.trigger('plot:added', position);
                }
            },
            onClose: function() {
                if (this.marker) {
                    google.maps.event.clearInstanceListeners(this.marker);
                    this.marker.setMap(null);
                    delete this.marker;
                }
            },
            onChangeSelected: function(model, selected) {
                if (selected) {
                    google.maps.event.trigger(this.marker, 'select');
                } else {
                    google.maps.event.trigger(this.marker, 'close');
                }
            },
            select: function() {
                console.log("Selected!!");
                var current = this.model.get('selected');
                this.model.set({
                    selected: !current
                });
                if (this.marker.getAnimation() !== null) {
                    this.marker.setAnimation(null);
                } else {
                    this.marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            },
            open: function() {
                this.infowindow.open(this.map, this.marker);
            },
            close: function() {
                this.infowindow.close(this.map, this.marker);
            }
        });
        return PlotItem;
    });