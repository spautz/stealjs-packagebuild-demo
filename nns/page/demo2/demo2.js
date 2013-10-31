/*global steal*/

steal(
    'jquery',
    'nns/control/pagecontroller',

    function($, BasePageController) {
        'use strict';

        /**
         * This is the PageController for the "demo2" page. It gets instantiated on <body> when
         * the page first loads; it's the main entry point for the app's functionality.
         *
         * See nns/control/pagecontroller for information about what a page-specific PageController
         * would normally be in charge of.
         */
        return BasePageController.extend({
        }, {
            init: function() {
                this._super.apply(this, arguments);

                $('.viewport-content').html('Hello world, this is Demo #2');
            }
        });
    }
);
