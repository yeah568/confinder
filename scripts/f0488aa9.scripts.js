"use strict";function degToRad(a){return a*(Math.PI/180)}var app=angular.module("confinderApp",["confinderApp.filters","ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap","google-maps"]);app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"ConsCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("ConsCtrl",["$scope","$http",function(a,b){function c(b,c){var d=6371,e=degToRad(b-a.currentLat),f=degToRad(c-a.currentLng),g=Math.sin(e/2)*Math.sin(e/2)+Math.cos(degToRad(b))*Math.cos(degToRad(a.currentLat))*Math.sin(f/2)*Math.sin(f/2),h=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g)),i=d*h;return Math.round(i)}function d(){a.cons.forEach(function(a){a.distance=c(a.lat,a.lng)}),a.locationLoaded=!0,a.sort="distance",a.map.center={latitude:a.currentLat,longitude:a.currentLng}}function e(b,c){c="undefined"!=typeof c?c:"danger",a.$apply(function(){a.alerts.push({msg:b,type:c})})}a.cons={},b.get("cons.json").success(function(b){a.cons=b,a.cons.forEach(function(a){a.start=Date.parse(a.start),a.end=Date.parse(a.end)})}).error(function(a){e(a)}),a.geolocate=function(){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(b){a.$apply(function(){a.currentLat=b.coords.latitude,a.currentLng=b.coords.longitude,d()})},function(a){e("Something went wrong with geolocation! Try again in a bit. Error: "+a.code+", "+a.message)}):e("Sorry, geolocation isn't supported by your browser. Try entering a place instead (or update your browser!)")},a.geocode=function(){var b=new google.maps.Geocoder;b.geocode({address:a.address},function(b,c){c===google.maps.GeocoderStatus.OK?a.$apply(function(){a.currentLat=b[0].geometry.location.lat(),a.currentLng=b[0].geometry.location.lng(),d()}):e("Something went wrong with getting your location! Try again in a bit. Error: "+c)})},a.sort="name",a.setSort=function(b){a.sort=b},a.alerts=[],a.closeAlert=function(b){a.alerts.splice(b,1)},a.map={center:{latitude:49,longitude:-122},zoom:4}}]),angular.module("confinderApp.filters",[]).filter("upcoming",function(){return function(a){for(var b=[],c=0;c<a.length;c++)a[c].end+86399999>Date.now()&&b.push(a[c]);return b}});