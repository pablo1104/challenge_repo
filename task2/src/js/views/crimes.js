define(
    ['app', 'jquery', 'marionette', 'handlebars', 'views/crime', 'text!templates/crimesTemplate.html'],
    function(app, $, Marionette, Handleblars, CrimeView, crimesTemplate) {
        var CrimesView = Marionette.CompositeView.extend({
            template: Handleblars.compile(crimesTemplate),
            className: 'table-content',
            childView: CrimeView,
            childViewContainer: "ul",
            initialize: function(options) {
                var self = this;
                this.categories = [];
                $(this.collection.models).each(function(index) {
                    //console.log($.inArray(this.attributes.category, self.categories));
                    if ($.inArray(this.attributes.category, self.categories) === -1) self.categories.push(this.attributes.category);
                    //console.log(self.categories)
                    //_this.$el.find(element).append("<option value='"+this[value]+"'>"+this[value]+"</option>");
                });
                app.vent.on('filter:new', function(term) {
                    self.term = term;
                    self.filter = function(child, index, collection, term) {
                        if (self.term !== "" && self.term !== undefined && self.term !== "Select a category") return child.get('category') == self.term;
                        else return 1;
                    }
                    self.render();
                    //self.collection.where({category: term});
                });
            }
        });
        return CrimesView;
    });