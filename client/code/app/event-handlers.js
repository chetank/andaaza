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
});

$(".delete-story").bind("click", function() {
    $('.story-container:last').remove();
});

$('.add-story').bind("click", function(){
    // create new story div
    var storyContainerDiv = ($("<div/>", {
        class: "story-container"
    }).appendTo(".stories-container"));

    setInputElements(
        storyContainerDiv,
        "story-title-container span3",
        "story-title",
        "Enter title for New Story",
        "input-xlarge");

    //create new tasks div
    var tasksContainerDiv = $("<div/>", {
            class: "tasks-container span9"
    }).appendTo(storyContainerDiv);

    createNewTask(tasksContainerDiv, null);
});

$(document).ready(function() {
    $('body').on('click', '.add-task', function() {
        createNewTask($(this).closest('.tasks-container'), this);
    });

    $('body').on('click', '.remove-task', function() {
        if($(this).closest('.tasks-container').children().length == 1) {
            $(this).closest('.story-container').remove();
        } else {
            $(this).closest('.task-container').remove();
        }
    });
});

function createNewTask(tasksContainerDiv, anchorReference) {

    var taskContainerDiv;
    //first check if task has to be inserted in between two task
    if(anchorReference != null &&
        $(anchorReference).closest('.task-container').next().children().length > 0 )
    {
        var div = $("<div/>", {
            class:  "task-container row-fluid"
        });
        taskContainerDiv = div.insertAfter($(anchorReference).closest('.task-container'));
    } else {
        // create new task div (parent row for every task)
        taskContainerDiv = $("<div/>", {
            class:  "task-container row-fluid"
        }).appendTo(tasksContainerDiv);
    }
    // create task title div container and text box for title
    setInputElements(
        taskContainerDiv,
        "task-title-container span4",
        "task-title",
        "Enter title for new task",
        "input-xlarge");

    taskCrudOperations(taskContainerDiv);

    setInputElements(taskContainerDiv, "be-container span1", "be", "0","input-mini");
    setInputElements(taskContainerDiv, "le-container span1", "le", "0","input-mini");
    setInputElements(taskContainerDiv, "we-container span1", "we", "0","input-mini");
    setInputElements(taskContainerDiv, "ae-container span1", "ae", "0","input-mini");
    setInputElements(taskContainerDiv, "std-container span1", "std", "0","input-mini");
    setInputElements(taskContainerDiv, "cfd-container span1", "cfd", "0","input-mini");
}

function setInputElements(container,innerContainerClass,inputName,placeholder,width) {
    var wrapperDiv = $("<div/>",{
        class: innerContainerClass
    }).appendTo(container);

    var element = $("<input/>", {
        name:   inputName,
        placeholder:  placeholder,
        class:  width,
        type:   "text"
    }).appendTo(wrapperDiv);
}

function taskCrudOperations(taskContainerDiv) {
    var crudContainerDiv = $("<div/>", {
        class: "task-crud-container span1"
    }).appendTo(taskContainerDiv);

    $("<a/>", {
        href: "#",
        class: "btn btn-mini btn-primary remove-task",
        text: "-",
        style: "margin-right: 2px"
    }).appendTo(crudContainerDiv);

    $("<a/>", {
        href: "#",
        class: "btn btn-mini btn-primary add-task",
        text: "+"
    }).appendTo(crudContainerDiv);
}