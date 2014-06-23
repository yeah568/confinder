'use strict';

angular.module('confinderApp.filters', []).
	filter('upcoming', function () {
		return function (cons) {
			var upcoming = [];
			for (var i=0; i<cons.length; i++) {
				// is it past the end of the last day, 86399999 is 24 hours less 1 millisecond
				if ((cons[i].end + 86399999) > Date.now()) {
					upcoming.push(cons[i]);
				}
			}
			return upcoming;
		};
	}
);
