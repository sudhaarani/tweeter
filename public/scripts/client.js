/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//client-side js logic goes here
// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetArticle = (tweet) => {
  const $article = $('<article>');

  const $header = $('<header>').addClass('article-header');
  const $avatarName = $('<div>').addClass('article-header-avatarName');
  $avatarName
    .append($('<div>').append($('<img>').attr('src', tweet.user.avatars)))
    .append($('<div>').text(tweet.user.name));

  const $handle = $('<div>').addClass('article-header-handle').text(tweet.user.handle);

  $header.append($avatarName).append($handle);

  // Use the $tweetContent and $tweetText you created safely here

  const $tweetContent = $('<div>').append($('<b>')).text(tweet.content.text);
  //const $content = $('<div>').append($tweetContent);

  const $footer = $('<footer>').addClass('footer-article')
    .append($('<div>').text(timeago.format(tweet.created_at)))
    .append(
      $('<div>').addClass('i-tag')
        .append($('<i>').addClass('fa-solid fa-flag').attr('id', 'flag'))
        .append($('<i>').addClass('fa-solid fa-retweet').attr('id', 'retweet'))
        .append($('<i>').addClass('fa-solid fa-heart').attr('id', 'heart'))
    );

  // Now append everything into the main article object
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
    const $form = $("#tweet-form");
    console.log("form:", $form);
    $form.on("submit", function (event) {
      event.preventDefault();//to prevent data(form) submission and page refresh
      $tweet = $("#tweet-text").serialize();//turns a set of form data into a query string
      console.log("tweet:", $tweet);
      if ($("#tweet-text").val() === "" || null) {
        return alert("Message should not empty!");
      }
      console.log("length:", $("#tweet-text").val().length);
      if ($("#tweet-text").val().length > 140) {
        return alert("Your message length exceeds 140 character!");
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
      //to make a request to /tweets and receive the array of tweets as JSON
      const loadTweets = function () {
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
      loadTweets();
    });
  });

});
