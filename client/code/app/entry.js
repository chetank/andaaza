// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
	console.log('Connection down :-(');
		});

	ss.server.on('reconnect', function(){
		console.log('Connection back up :-)');
	});

ss.server.on('ready', function(){
	// Wait for the DOM to finish loading
	jQuery(function(){
		// Load app
		require('/event-handlers');
	});
});


/*function andaaza(){
 this.stories = new Array();
 this.title = null;

 this.setTitle = function(title) {
 this.title = title;
 }

 this.setStories = function(stories) {
 this.stories = stories;
 }

 this.getStory = function(i) {
 return this.stories[i];
 }

 this.deleteStory = function(story) {
 this.stories.splice( $.inArray(story, this.stories), 1 );
 }

 this.newStoryAtEnd = function(story){
 var size = this.stories.length;
 this.stories[size] = story;
 }

 this.insertNewStory = function(story, pos) {
 for (var i = this.stories.length ; i >= pos; i--) {
 this.stories[i] = this.stories[i-1];
 }
 this.stories[pos-1] = story;
 }
 }
 */

/*
 function story() {
 this.title = null;
 this.tasks = new Array();
 this.id = null;
 this.storyDiv = null;
 this.tasksDiv = null;

 this.setstoryDiv = function(div) {
 this.storyDiv = div;
 }

 this.setId = function (id) {
 this.id = id;
 }

 this.setTitle = function (title) {
 if(this.title == null) {
 alert("Please enter a story title");
 }
 }

 this.setTasks = function (tasks) {
 this.tasks = tasks;
 }

 this.getTask = function(i) {
 return this.tasks[i];
 }

 this.deleteTask = function(task) {
 this.tasks.splice( $.inArray(task, this.tasks), 1 );
 }

 this.createNewTask = function(){
 var newTask = new task();
 this.tasks[this.tasks.length] = newTask;

 // create new task div (parent row for every task)
 newTask.taskDiv = $("<div/>", {
 class:  "task-container row-fluid"
 }).appendTo(this.tasksDiv);

 // create task div container and text box for title
 newTask.eltitle = setInputElements(
 newTask.taskDiv,
 "task-title-container span4",
 "task-title",
 "Enter title for new task",
 "input-xlarge");

 taskCrudOperations(newTask);
 /*newTask.elbestestimate = setInputElements(newTask.id+"-be", newTask.taskDiv, "be", "0","input-mini","span1");
 newTask.ellestestimate = setInputElements(newTask.id+"-le", newTask.taskDiv, "le", "0","input-mini","span1");
 newTask.elwestestimate = setInputElements(newTask.id+"-we", newTask.taskDiv, "we", "0","input-mini","span1");
 newTask.elaestestimate = setInputElements(newTask.id+"-ae", newTask.taskDiv, "ae", "0","input-mini","span1");
 newTask.elstdstestimate = setInputElements(newTask.id+"-std", newTask.taskDiv, "std", "0","input-mini","span1");
 newTask.elcfdstestimate = setInputElements(newTask.id+"-cfd", newTask.taskDiv, "cfd", "0","input-mini","span1");

 }
 }
 */

/*
 function task() {
 this.title = null;
 this.bestestimate = null;
 this.likelyestimate = null;
 this.worstestimate = null;
 this.avgestimate = null;
 this.stddeviation = null;
 this.confidence = null;
 this.id = null;
 this.taskDiv = null;
 this.crudDiv = null;

 //display elements
 this.eltitle = null;
 this.createNewTaskButton = null;
 this.removeTaskButton = null;
 this.elbestestimate = null;
 this.ellikelyestimate = null;
 this.elworstestimate = null;
 this.elavgestimate = null;
 this.elstddeviation = null;
 this.elconfidence = null;

 this.setCreateNewTaskButton = function(btn) {
 this.createNewTaskButon = btn;
 }

 this.setRemoveTaskButton = function(btn) {
 this.removeTaskButton = btn;
 }

 this.setId = function (id) {
 this.id = id;
 if(this.taskDiv != undefined) {
 console.log("inside set id");
 this.taskDiv.attr("id", id);
 }
 }

 this.setTitle = function(title) {
 this.title = title;
 }

 this.setBestestimate = function(be){
 this.bestestimate = be;
 }

 this.setLikelyestimate = function(le){
 this.likelyestimate = le;
 }

 this.setWorstestimate = function(we){
 this.worstestimate = we;
 }

 this.setAvgestimate = function(ae){
 this.avgestimate = ae;
 }

 this.setStddeviation = function(sd){
 this.stddeviation = sd;
 }

 this.setConfidence = function(cfd){
 this.confidence = cfd;
 }
 }
 */

