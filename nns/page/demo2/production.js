steal.has("stealconfig.js","nns/page/demo2/demo2.js");steal({id:"packages/demo-demo2.js",waits:!0,has:"jquery can/util/can.js can/util/array/each.js can/util/inserted/inserted.js can/util/jquery/jquery.js can/util/bind/bind.js can/util/string/string.js can/construct/construct.js can/util/batch/batch.js can/map/map.js can/util/string/deparam/deparam.js can/route/route.js can/control/control.js can/control/route/route.js can/list/list.js can/model/model.js can/view/view.js can/compute/compute.js can/view/scope/scope.js can/view/elements.js can/view/scanner.js can/view/node_lists.js can/view/live.js can/view/render.js can/view/mustache/mustache.js can/observe/observe.js can/view/bindings/bindings.js can/component/component.js can/can.js can/construct/super/super.js nns/control/pagecontroller/pagecontroller.js".split(" ")});
steal.pushPending();steal.config({map:{"*":{"can/util/util.js":"can/util/jquery/jquery.js","jquery/jquery.js":"jquery"}},paths:{jquery:"can/lib/jquery.1.9.1.js","can/":"lib/canjs/"},shim:{jquery:{exports:"jQuery"}},ext:{js:"js",css:"css",less:"steal/less/less.js",coffee:"steal/coffee/coffee.js",ejs:"can/view/ejs/ejs.js",mustache:"can/view/mustache/mustache.js"}});steal.executed("stealconfig.js");
steal("jquery","nns/control/pagecontroller",function(a,b){return b.extend({},{init:function(){this._super.apply(this,arguments);a(".viewport-content").html("Hello world, this is Demo #2")}})});steal.executed("nns/page/demo2/demo2.js");steal.popPending();
