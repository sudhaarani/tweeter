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

const createTweetArticle = (tweet) => {
  const $tweet = `<article>
  <header class="article-header">
    <div class="article-header-avatarName">
      <div><img src="${tweet.user.avatars}"></div>
      <div>${tweet.user.name}</div>
    </div>
    <div class="article-header-handle">${tweet.user.handle}</div>
  </header>
  <br>
  <div>
    <div><b>${tweet.content.text}</b></div>
    <br>
    <div class="horizontal-line"></div>
  </div>
  <footer>
    <div class="footer-article">
     ${tweet.created_at}
      <div class="i-tag">
        <i class="fa-solid fa-flag" id="flag"></i>
        <i class="fa-solid fa-retweet" id="retweet"></i>
        <i class="fa-solid fa-heart" id="heart"></i>
      </div>
    </div>
  </footer>
  </article>`;
  return $tweet;
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
    });
  });

});
