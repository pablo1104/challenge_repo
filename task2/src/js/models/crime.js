define(
    ['app', 'backbone'],
    function(app, Backbone) {
        var Crime = Backbone.Model.extend({
            urlRoot: 'https://data.police.uk/api/crimes-at-location?date=2012-02&lat=51.521862899999995&lng=-0.07246559999999999',
            defaults: {
                //used to keep the item synced between the map and the result list
                selected: false
            },
        });
        return Crime;
    });