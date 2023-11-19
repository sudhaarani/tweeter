
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

  //scroll to top of the page
  // Make the page scroll to the top and enable the textarea when the(new) up-arrow button is clicked
  $(window).on("scroll", function () {
    // When the user scrolls down 20px from the top of the document, show the button
    if ($(document).scrollTop() > 20) {
      //   console.log("scrollTop() > 20");
      $("#scrollBtn").css({ "display": "block" });
    } else {
      //  console.log("scrollTop() < 20");
      $("#scrollBtn").css({ "display": "none" });
    }
    // $(".logo").css({ "position": "fixed" });

    // When the user clicks on the button, scroll to the top of the document
    $("#scrollBtn").on("click", function () {
      // console.log("btn clicked");
      $(document).animate({ scrollTop: 0 });
      $(".new-tweet").show();//to show the new-tweet section from hidden
      $("#tweet-text").focus(); //to enable the textarea
    });
  });
});