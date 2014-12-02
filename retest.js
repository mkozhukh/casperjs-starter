var fs = require('fs');

casper.restart = function(name){
	casper.start(name);
	casper.viewport(1024, 768);
	casper.wait(100);
};

casper.rescreen = function(name, locator){
	casper.then(function(){
		var parts = casper.test.currentTestFile.split(/[\\\/]/g);
		var base = parts[parts.length-2];
		if (base == "retest") base = "/"; else base += "/";
		var path = "./retest/"+base+"base/"+name+".png";
		var fail = "./retest/"+base+"failed/"+name+".png";
		var origin = "./retest/"+base+"failed/"+name+".origin.png";

		if (!fs.isFile(path)){
			this.captureSelector(path, (locator || "body"));
			this.test.assert(true, "Created "+name);
		} else {
			this.captureSelector(fail, (locator || "body"));
			var equal = fs.read(path) == fs.read(fail);
			if (equal)
				fs.remove(fail);
			else
				fs.copy(path, origin);

			this.test.assert(equal, "Check "+name);
		}
	});
};

(function(){

function resolveSelectors(items){
	var items =  Array.prototype.slice.call(items, 0);
	for(var i =0; i < items.length; i++){
		if(typeof (items[i]) == "function"){
			items[i] = items[i].call(casper.gantt);
		}
	}
	return items;
}
function nest(){
	return resolveSelectors(arguments).join(" ");
}
function join(){
	return resolveSelectors(arguments).join("");
}
function combine(){
	return resolveSelectors(arguments).join(", ");
}


casper.gantt = {
	//TODO: move selectors api to a separate file,
	//implement a less tedious way to generate methods for a basic layout (json config, or generate from page layout)

	task:function(num){
		return this.nth(".gantt_task_line", num);
	},
	taskRow: function(num){
		return this.nth(".gantt_row", num);
	},
	addTaskBtn : function(num){
		if(!num)
			return ".gantt_grid_head_add";
		else
			return nest(this.taskRow(num), ".gantt_add");
	},
	toggleTask : function(num){
		num = num || 1;

		return combine(
			nest(this.taskRow(num), ".gantt_tree_icon.gantt_close"),
			nest(this.taskRow(num), ".gantt_tree_icon.gantt_open")
		);
	},
	toggleTaskId : function(id){
		return combine(
			nest(join(this.taskRow, this.taskId(id)), ".gantt_tree_icon.gantt_close"),
			nest(join(this.taskRow, this.taskId(id)), ".gantt_tree_icon.gantt_open")
		);
	},
	lightbox: function(){
		return ".gantt_cal_light";
	},
	lightboxText: function(nth){
		return nest(this.lightbox, this.nth("textarea", nth));
	},
	lightboxDuration: function(){
		return nest(this.lightbox, ".gantt_duration");
	},
	lightboxDurationInc: function(){
		return nest(this.lightboxDuration, ".gantt_duration_inc");
	},
	lightboxDurationDec: function(){
		return nest(this.lightboxDuration, ".gantt_duration_dec");
	},
	lightboxDurationValue: function(){
		return nest(this.lightboxDuration, ".gantt_duration_value");
	},

	lightboxTime: function(nth){
		return nest(this.lightbox, this.nth(".gantt_time_selects select", nth))
	},
	lightboxStartDay: function(){
		return this.lightboxTime(1);
	},
	lightboxStartMonth: function(){
		return this.lightboxTime(2);
	},
	lightboxStartYear: function(){
		return this.lightboxTime(3);
	},

	lightboxSave: function(){
		return nest(this.lightbox, ".gantt_save_btn_set");
	},
	lightboxDelete: function(){
		return nest(this.lightbox, ".gantt_delete_btn_set");
	},
	lightboxCancel: function(){
		return nest(this.lightbox, ".gantt_cancel_btn_set");
	},

	modal: function(){
		return ".dhtmlx_modal_box";
	},
	modalOk: function(){
		return nest(this.modal,".dhtmlx_ok_button");
	},
	modalCancel: function(){
		return nest(this.modal,".dhtmlx_cancel_button");
	},

	id: function(id){
		return "#" + id;
	},
	taskId: function(id){
		return "[task_id='" + id + "']";
	},
	input: function(name){
		return "input[name=" + name + "]";
	},
	nth: function(selector, num){
		if(num !== undefined){
			num = num || 1;
			return join(selector, ":nth-child(" + num + ")");
		}else{
			return selector;
		}
	}
};

})();