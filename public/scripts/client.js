/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//client-side js logic goes here
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
  $.each(tweets, (index, tweet) => {
    // $('.section-tweet-article').empty();
    //appending the article created to section parent
    $('.section-tweet-article').prepend(createTweetArticle(tweet));//prepend method is used, to add latest tweet at the top
  });
};

$(document).ready(function () {
  renderUserTweet(data);
});
