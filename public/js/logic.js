const name = $("#name").val().trim();
const comment = $("#comment").val().trim();


$("#submitCommentButton").on("click", function(){
    event.preventDefault();
    console.log("comment submit");
    
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/" + thisId + "/add-comment",
        data: {
            "name": name,
            "comment": comment
        }
    }).then(function(data){
        $.ajax({
            method: "GET",
            url: "/" + thisId
        })
    });
});