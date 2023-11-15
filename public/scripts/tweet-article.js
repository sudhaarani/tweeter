//client-side js logic goes here
const users = [{
  name: "abc",
  avatar: "imageabc",
  handle: "@abc",
  msg: "helo",
  date: "1 day ago"
}, {
  name: "123",
  avatar: "image123",
  handle: "@123",
  msg: "helo family",
  date: "10 days ago"
}, {
  name: "xyz",
  avatar: "imagexyz",
  handle: "@xyz",
  msg: "helo world",
  date: "15 days ago"
}];

const createTweetArticle = (randomUser) => {
  const $tweet = `<article>
  <header class="article-header">
    <div class="article-header-avatarName">
      <div>${randomUser.avatar}</div>
      <div>${randomUser.name}</div>
    </div>
    <div class="article-header-handle">${randomUser.handle}</div>
  </header>
  <br>
  <div>
    <div><b>${randomUser.msg}</b></div>
    <br>
    <div class="horizontal-line"></div>
  </div>
  <footer>
    <div class="footer-article">
      ${randomUser.date}
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

const renderUserTweet = function (users) {
  $.each(users, (index, userObj) => {
    $('.section-tweet-article').append(createTweetArticle(userObj));//appending the article created to section parent
  });
};

$(document).ready(function () {
  renderUserTweet(users);
});