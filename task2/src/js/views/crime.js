define(
    ['app', 'marionette', 'handlebars', 'text!templates/crimeTemplate.html'],
    function(app, Marionette, Handleblars, crimeTemplate) {
        var CrimeView = Marionette.ItemView.extend({
            template: Handleblars.compile(crimeTemplate),
            modelEvents: {
                'change:selected': 'render'
            },
            events: {
                'click': 'clickSelected'
            },
            clickSelected: function() {
                var current = this.model.get('selected');
                this.model.set({
                    selected: !current
                });
            }
        });
        return CrimeView;
    });