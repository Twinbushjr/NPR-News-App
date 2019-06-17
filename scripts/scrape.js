// scrape script
// -------------

// Require request and cheerio, allowing scrapes
const request = require("request");
const cheerio = require("cheerio");

const scrape = function (cb) {
  request("https://www.npr.org/", (err, res, body) => {
    if (!err && res.statusCode == 200) {
      var $ = cheerio.load(body);
      var articles = [];

      $(".story-wrap").each(function (i, element) {

        var head = $(this).find("h3.title").text().trim();

        var sum = $(this).find(".teaser").text().trim();

        var link = $(this).find("a").attr("href");
        console.log(head);
        console.log(sum);
        console.log(link);

        if (head && sum && link) {
          const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          const dataToAdd = {
            headline: headNeat,
            summary: sumNeat,
            link: link
          };

          console.log(dataToAdd);
          articles.push(dataToAdd);
        }
      });

      console.log(articles);
      cb(articles);
    };
  });
}

module.exports = scrape;