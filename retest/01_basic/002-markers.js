var gantt = require("../../retest.js");

casper.test.begin('Deadline Markers', function suite(test) {
	casper.restart("http://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html");

	casper.rescreen('002-normal-state');
	casper.then(function(){
		this.click( this.gantt.task() );
	});
	casper.rescreen('002-row-selected');

	casper.run(function(){
		test.done();
	})
});