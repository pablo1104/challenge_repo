"use strict";define(["app","underscore","marionette","views/map-plot","handlebars","text!templates/mapsTemplate.html","google-maps"],function(app,_,Marionette,plotItemView,Handleblars,mapsTemplate){var Map=Marionette.CompositeView.extend({type:"handlebars",template:Handleblars.compile(mapsTemplate),childViewContainer:"#mapContainer",childView:plotItemView,firstPlot:!1,ui:{mapContainer:"#mapContainer"},defaults:{plots:[]},initialize:function(){this.resetMap(),this.listenTo(app.vent,"plot:added",this.centralizeMap),this.listenTo(this.collection,"sync",this.resetMap);var self2=this;app.vent.on("filter_map:new",function(term){self2.term=term,self2.filter=function(child,index,collection){return self2.firstPlot=!1,""!==self2.term&&void 0!==self2.term&&"Select a category"!==self2.term?child.get("category")==self2.term:1},self2.render()})},buildChildView:function(item,ItemViewType,itemViewOptions){var options=_.extend({model:item,map:this.map},itemViewOptions),view=new ItemViewType(options);return view},onRender:function(){var self=this;GoogleMapsLoader.KEY="AIzaSyBIbh8bNtDlOaY7DWEljz1acEjuITJHDdI",GoogleMapsLoader.sensor=!1,GoogleMapsLoader.load(function(google){var defaults={zoom:5,center:new google.maps.LatLng(51.521862899999995,-.07246559999999999),mapTypeId:google.maps.MapTypeId.ROADMAP,sensor:!1,streetViewControl:!1,mapTypeControl:!1};self.map=new google.maps.Map(self.ui.mapContainer[0],defaults),google.maps.event.addListener(self.map,"idle",function(){self.firstPlot===!1&&(self.children.each(function(view){view.map=self.map,view.renderPlot()}),self.firstPlot=!0)})})},resetMap:function(){this.plots=[]},centralizeMap:function(data,e){this.plots.push(data);for(var latlngbounds=new google.maps.LatLngBounds,i=0;i<this.plots.length;i++)latlngbounds.extend(this.plots[i]);this.map.fitBounds(latlngbounds)}});return Map});