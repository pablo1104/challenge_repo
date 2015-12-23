define(
    ['backbone', 'models/crime'],
    function(Backbone, Crime) {
        var Crimes = Backbone.Collection.extend({
            url: 'https://data.police.uk/api/crimes-at-location?date=2012-02&lat=51.521862899999995&lng=-0.07246559999999999',
            model: Crime
        });
        return Crimes;
    });