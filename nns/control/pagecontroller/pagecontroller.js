/*global steal*/

steal(
    'can',
    'can/construct/super',

    function(can) {
        'use strict';

        /**
         * We initialize a distinct "PageController" for each distinct page, which is responsible
         * for the overall execution and flow of the page. This is the base class used for each
         * page-specific PageController.
         *
         * Each page-specific PageController is responsible for:
         *  - setting up and responding to routes
         *  - rendering the top-level chrome/layout for the page
         *  - setting up the shared observables and models which the rest of the page uses
         *  - initializing the controls which make the rest of the page work
         */
        return can.Control.extend({
        }, {
            init: function() {
                window.console && window.console.log('Base PageController initialized: ', this);
            }
        });
    }
);

