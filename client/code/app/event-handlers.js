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

    setInputElements(storyContainerDiv, "story-title-container span3", "story-title", "Enter title for New Story", "input-xlarge", false);

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


    /*var tallyContainerDiv = ($("<div/>", {
        class: "tally-container row-fluid text-center"
    }).before('.stories-container'));

    var tallyTitleContainerDiv = ($("<div/>", {
        class: "span3"
    }).before('.stories-container'));

    setInputElements(
        tallyTitleContainerDiv,
        "tally-title-container",
        "tally-title",
        "Running Tally of Estimates",
        "input-xlarge"
    );
    */

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
    setInputElements(taskContainerDiv, "task-title-container span4", "task-title", "Enter title for new task", "input-xlarge", false);

    taskCrudOperations(taskContainerDiv);

    setInputElements(taskContainerDiv, "estimates be-container span1", "be", "0", "input-mini", false);
    setInputElements(taskContainerDiv, "estimates le-container span1", "le", "0", "input-mini", false);
    setInputElements(taskContainerDiv, "estimates we-container span1", "we", "0", "input-mini", false);
    setInputElements(taskContainerDiv, "calc-estimates ae-container span1", "ae", "0", "input-mini", true);
    setInputElements(taskContainerDiv, "calc-estimates std-container span1", "std", "0", "input-mini", true);
    setInputElements(taskContainerDiv, "calc-estimates cfd-container span1", "cfd", "0", "input-mini", true);
}

function setInputElements(container, innerContainerClass, inputName, placeholder, width, disabled) {
    var wrapperDiv = $("<div/>",{
        class: innerContainerClass
    }).appendTo(container);

    $("<input/>", {
        name:   inputName,
        placeholder:  placeholder,
        class:  width,
        type:   "text",
        disabled: disabled
    }).appendTo(wrapperDiv).on('input', function() {
            calculateSingleTaskEstimates(this);
        });
}

function estimateCalculator(be, le, we) {

}

function stdCalculator(be, le, we) {

}

function updateTally() {
    var sumOfAllBe = 0;

    $("input[name='be']").each(function() {
        sumOfAllBe += Number($(this).val());
    });

    var sumOfAllWe = 0;
    $("input[name='we']").each(function() {
        sumOfAllWe += Number($(this).val());
    });
}

function calculateSingleTaskEstimates(estimateInputObj) {
    //get all three values for the task that was just updated
    var estimates = $(estimateInputObj).closest('.task-container');

    var be = estimates.find('input[name=be]').val();
    var le = estimates.find('input[name=le]').val();
    var we = estimates.find('input[name=we]').val();

    if (be != '' && le != '' && we != '') {
        var ae = ((parseFloat(be) + 4*parseFloat(le) + parseFloat(we))/6).toFixed(2);
        var std = ((parseFloat(we) - parseFloat(be)) / 6).toFixed(2);
        var cfd = parseFloat(ae) + 2*parseFloat(std);

        estimates.find('input[name=ae]').val(ae);
        estimates.find('input[name=std]').val(std);
        estimates.find('input[name=cfd]').val(cfd);
    }
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