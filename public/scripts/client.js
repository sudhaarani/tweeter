/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetArticle = (tweet) => {
  const $article = $('<article>');

  const $header = $('<header>').addClass('article-header');
  const $avatarName = $('<div>').addClass('article-header-avatarName');
  $avatarName
    .append($('<div>').append($('<img>').attr('src', tweet.user.avatars)))
    .append($('<div>').text(tweet.user.name));

  const $handle = $('<div>').addClass('article-header-handle').text(tweet.user.handle);

  $header.append($avatarName).append($handle);

  //to prevent XSS from user through textarea,using .text() Escaping method
  const $tweetContent = $('<div>').append($('<b>')).text(tweet.content.text);

  const $footer = $('<footer>').addClass('footer-article')
    .append($('<div>').text(timeago.format(tweet.created_at)))
    .append(
      $('<div>').addClass('i-tag')
        .append($('<i>').addClass('fa-solid fa-flag').attr('id', 'flag'))
        .append($('<i>').addClass('fa-solid fa-retweet').attr('id', 'retweet'))
        .append($('<i>').addClass('fa-solid fa-heart').attr('id', 'heart'))
    );

  // append everything into the main article object
  $article
    .append($header)
    .append($('<br>'))
    .append($tweetContent)
    .append($('<br>'))
    .append($('<div>').addClass('horizontal-line'))
    .append($footer);

  return $article;
};


const renderUserTweet = function (tweets) {
  $('.section-tweet-article').empty();
  $.each(tweets, (index, tweet) => {
    //appending the article created to section parent
    $('.section-tweet-article').prepend(createTweetArticle(tweet));//prepend method is used, to add latest tweet at the top
  });
};

$(document).ready(function () {
  console.log("ready");
  $(function () {

    //to move new tweet up and down
    function topInc() {
      $("#new-tweetArrow").animate({ top: '10px' }, 500, topDec); //topDec is callback func which s added to move infinitively
    }
    function topDec() {
      $("#new-tweetArrow").animate({ top: '0px' }, 500, topInc);
    }
    topInc();

    //to slide the whole new-tweet section down when the button is clicked
    $("#new-tweetBtn").on("click", function () {
      $(".new-tweet").slideDown();

      const $form = $("#tweet-form");
      $form.on("submit", function (event) {
        event.preventDefault();//to prevent data(form) submission and page refresh
        $tweet = $("#tweet-text").serialize();//turns a set of form data into a query string

        $("#error-display").slideUp(); //div with this id is hidden when page is loaded

        if ($("#tweet-text").val() === "" || null) {//to show err msg when text area is empty
          $("#error-display").text("Please enter a tweet");
          return $("#error-display").slideDown();//div with this id is shown when text area is empty and msg is shown
        }
        if ($("#tweet-text").val().length > 140) {//to show err msg when text area is exceeds 140 char
          $("#error-display").text("Your message length exceeds 140 character!");
          return $("#error-display").slideDown();
        }

        //to submit a POST request that sends the serialized data to the server
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $tweet,
          success: function (res) {
            $('#tweet-text').val('');//clearing the textarea once msg is sent
            $(".counter").val("140").css({ "font-weight": "bold", "color": "black" });//set counter back to 140 count with added css once msg is sent
            console.log(`data received:: ${res}`);
          },
          error: function (err) {
            console.log(`error received:: ${err}`);
          }
        });
        loadTweets();//to load entered tweet as an article
      });
    });

    //to make a request to /tweets and receive the array of tweets as JSON
    const loadTweets = function () {
      console.log("loadTweets func:");
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: (jsondata) => { //data received from server
          console.log("data received json:", jsondata);
          renderUserTweet(jsondata);
        },
        error: (error) => {
          console.log("error received:", error);
        },
      });
    };
    loadTweets();//to load tweets in db as an article

  });
});
