function andaaza(){
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

function setInputElements(id,parentEl,name,placeholder,width,span) {
    $("<div/>",{
        id: id,
        class: span
    }).appendTo(parentEl);

    var element = $("<input/>", {
        name:   name,
        id:     id,
        placeholder:  placeholder,
        class:  width,
        type:   "text"
    }).appendTo("#"+id);

    return element;
}


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

    this.newTaskAtEnd = function(story){
        var newTask = new task();
        var size = this.tasks.length;
        this.tasks[size] = newTask;

        newTask.setId(this.id+"-task-"+size);

        // create new task div (parent row for every task)
        newTask.taskDiv = $("<div/>", {
		}).appendTo(this.tasksDiv);

        // create task div container and text box for title
        newTask.eltitle = setInputElements(newTask.id, newTask.taskDiv, "task-title", "Enter task title", "input-large", "span3");

        newTask.crudDiv = $("<div/>", {
            id: "crud-"+newTask.id,
            class: "span1"
        }).appendTo(newTask.taskDiv);

        newTask.setRemoveTaskButton($("<a/>", {
            href:   "#",
            class: "btn btn-mini btn-primary remove-task",
            text: "-",
            style:  "margin-right: 2px",
            id: "crud-"+newTask.id + "-crud",
        }).appendTo(newTask.crudDiv));

        newTask.setCreateNewTaskButton($("<a/>", {
            href:   "#",
            class: "btn btn-mini btn-primary add-task",
            text: "+",
            id: "crud-"+newTask.id + "-crud",
        }).appendTo(newTask.crudDiv));

        newTask.createNewTaskButon.bind("click", function() {
            console.log($(this).attr("class"));
            var id = $(this).attr("id");
            var storyIndex = id.split("-")[1];
            var taskIndex = id.split("-")[3];
            console.log("Story: " + storyIndex + " " + taskIndex);
            var story = report.stories[storyIndex];
            story.newTaskAtEnd(story);
        });

        newTask.elbestestimate = setInputElements(newTask.id+"-be", newTask.taskDiv, "be", "0","input-mini","span1");
        newTask.ellestestimate = setInputElements(newTask.id+"-le", newTask.taskDiv, "le", "0","input-mini","span1");
        newTask.elwestestimate = setInputElements(newTask.id+"-we", newTask.taskDiv, "we", "0","input-mini","span1");
        newTask.elaestestimate = setInputElements(newTask.id+"-ae", newTask.taskDiv, "ae", "0","input-mini","span2");
        newTask.elstdstestimate = setInputElements(newTask.id+"-std", newTask.taskDiv, "std", "0","input-mini","span2");
        newTask.elcfdstestimate = setInputElements(newTask.id+"-cfd", newTask.taskDiv, "cfd", "0","input-mini","span2");
    }
}

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

function estimateCalculator(be, le, we) {

}

function stdCalculator(be, le, we) {

}

function confidenceEstimateCalculator(be, le, we, ae, std) {

}

var report = null;
var divPrefix = "container-";
var divSuffix = "-title";

$(".create-report").bind("click", function() {
    var title = $( "input[name='report-title']").val();
    report = new andaaza();
    report.setTitle(title);
});

$(".delete-story").bind("click", function() {
    var story = report.stories[report.stories.length - 1];
    story.storyDiv.remove();
    report.deleteStory(story);
    console.log("delete story");
});

$('.add-story').bind("click", function(){

    // create new story and attach to report
    var newStory = new story();
    var numStories = report.stories.length;
    newStory.setId("story-" + numStories);
    report.newStoryAtEnd(newStory);

    // create new story div
    newStory.setstoryDiv($("<div/>", {
        id: newStory.id
    }).appendTo(".stories"));

    setInputElements(
        newStory.id+"-title",
        newStory.storyDiv,
        "story-title",
        "Enter Story Title",
        "input-xlarge",
        "span3");

        //create new tasks div
			newStory.tasksDiv = $("<div/>", {
			        id: newStory.id+"-tasks",
			        class: "span9"
		    }).appendTo(newStory.storyDiv);


    newStory.newTaskAtEnd();
    console.log("new story");
});

