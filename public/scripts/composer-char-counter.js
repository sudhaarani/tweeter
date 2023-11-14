
$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    //to traverse up the DOM tree from that node/element and then back down to a node that matches the '.counter'
    const parentToChild = $(this).parents("form").find(".counter");//"this" points to the textarea.
    const lettersRemaining = parentToChild.val() - 1;
    if (lettersRemaining < 0) {
      parentToChild.css({ "color": "red" });
    }
    parentToChild.html(`<b>${lettersRemaining}</b>`);//.html or.text can be used to update the text
  });
});