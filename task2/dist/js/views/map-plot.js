"use strict";define(["app","underscore","marionette","handlebars","text!templates/plotTemplate.html","google-maps"],function(app,_,Marionette,Handleblars,plotTemplate){var PlotItem=Marionette.ItemView.extend({type:"handlebars",template:Handleblars.compile(plotTemplate),initialize:function(){this.listenTo(this.model,"change:selected",this.onChangeSelected)},render:function(){this.isClosed=!1,this.triggerMethod("before:render",this),this.triggerMethod("item:before:render",this);var data=this.serializeData();data=this.mixinTemplateHelpers(data);var template=this.getTemplate();this.html=Marionette.Renderer.render(template,data);return this.bindUIElements(),this.triggerMethod("render",this),this.triggerMethod("item:rendered",this),this},renderPlot:function(){var id=this.options.model.get("id"),rnd_vr=Math.random()/1e3,lat=parseFloat(this.options.model.get("location").latitude)+rnd_vr;rnd_vr=Math.random()/1e3;var log=parseFloat(this.options.model.get("location").longitude)+rnd_vr;if(""!==id&&void 0!=id){var position=new google.maps.LatLng(lat,log);this.marker=new google.maps.Marker({position:position,map:this.map,title:"",animation:google.maps.Animation.DROP}),this.infowindow=new google.maps.InfoWindow({content:this.html}),google.maps.event.addListener(this.marker,"click",this.select.bind(this)),google.maps.event.addListener(this.marker,"select",this.open.bind(this)),google.maps.event.addListener(this.marker,"close",this.close.bind(this)),google.maps.event.addListener(this.infowindow,"closeclick",this.select.bind(this)),app.vent.trigger("plot:added",position)}},onClose:function(){this.marker&&(google.maps.event.clearInstanceListeners(this.marker),this.marker.setMap(null),delete this.marker)},onChangeSelected:function(model,selected){selected?google.maps.event.trigger(this.marker,"select"):google.maps.event.trigger(this.marker,"close")},select:function(){var current=this.model.get("selected");this.model.set({selected:!current}),null!==this.marker.getAnimation()?this.marker.setAnimation(null):this.marker.setAnimation(google.maps.Animation.BOUNCE)},open:function(){this.infowindow.open(this.map,this.marker)},close:function(){this.infowindow.close(this.map,this.marker)}});return PlotItem});