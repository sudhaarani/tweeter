
$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    //to traverse up the DOM tree from that node/element and then back down to a node that matches the '.counter'
    const parentToChild = $(this).parents("form").find(".counter");//"this" points to the textarea.
    const textarea = $(this).parents("form").find("#tweet-text");
    let lettersRemaining = 140 - textarea.val().length;
    if (lettersRemaining < 0) {
      parentToChild.css({ "color": "red" });
    }
    if (lettersRemaining >= 0) {
      parentToChild.css({ "color": "black" });
    }
    parentToChild.html(`<b>${lettersRemaining}</b>`);//.html or.text can be used to update the text
  });

  //scroll to top of the page
  // Make the page scroll to the top and enable the textarea when the(new) up-arrow button is clicked
  $(window).on("scroll", function () {
    // When the user scrolls down 20px from the top of the document, show the button
    if ($(document).scrollTop() > 20) {
      $("#scrollBtn").css({ "display": "block" });
    } else {
      $("#scrollBtn").css({ "display": "none" });
    }

    // When the user clicks on the button, scroll to the top of the document
    $("#scrollBtn").on("click", function () {
      $('html, body').animate({ scrollTop: 0 }, 100);
      $(".new-tweet").show();//to show the new-tweet section from hidden
      $("#tweet-text").focus(); //to enable the textarea
    });
  });
});