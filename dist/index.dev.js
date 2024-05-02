"use strict";

// axios - 특정 웹사이트 페이지 내용 가져오기
// cheerio - HTML 구조를 가지고 있는 일반 텍스트들
var axios = require("axios");

var cheerio = require('cheerio'); // 페이지의 내용을 긁어와서 해당 변수에 자료를 저장함.


var getHTML = function getHTML(keyword) {
  var html;
  return regeneratorRuntime.async(function getHTML$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("https://www.inflearn.com/courses?s=".concat(encodeURI(keyword))));

        case 3:
          html = _context.sent.data;
          return _context.abrupt("return", html);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("err : ", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var parsing = function parsing(page) {
  var $, courses, $coursesList;
  return regeneratorRuntime.async(function parsing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          $ = cheerio.load(page); // 읽어들인 강의 목록

          courses = [];
          $coursesList = $(".course_card_item");
          $coursesList.each(function (idx, node) {
            // :eq는 제이쿼리 선택자 문법임
            var title = $(node).find(".course_title:eq(0)").text();
            var instructor = $(node).find(".instructor:eq(0)").text();
            var price = 0;
            var ogPrice = 0;

            if ($(node).find(".pay_price").length > 0) {
              price = $(node).find(".pay_price:eq(0)").text();
              ogPrice = $(node).find("del:eq(0)").text();
            } else {
              price = $(node).find(".price:eq(0)").text();
            }

            var rating = Math.round(parseFloat($(node).find(".star_solid").css("width").slice(0, -1)));
            var reviewCount = $(node).find(".review_cnt").text().slice(1, -1);
            var imgSrc = $(node).find(".card-image > figure > img").attr('src');
            courses.push({
              title: title,
              instructor: instructor,
              price: price,
              ogPrice: ogPrice,
              imgSrc: imgSrc,
              rating: rating
            });
          });
          return _context2.abrupt("return", courses);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getCourse = function getCourse(keyword) {
  var html, courses;
  return regeneratorRuntime.async(function getCourse$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getHTML(keyword));

        case 2:
          html = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(parsing(html));

        case 5:
          courses = _context3.sent;
          console.log(courses);
          return _context3.abrupt("return", courses);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getFullCourse = function getFullCourse() {
  var courses, i, course;
  return regeneratorRuntime.async(function getFullCourse$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          courses = [];
          i = 1;

        case 2:
          if (!(1 <= 20)) {
            _context4.next = 10;
            break;
          }

          _context4.next = 5;
          return regeneratorRuntime.awrap(getCourse("\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8&order=search&page=".concat(i)));

        case 5:
          course = _context4.sent;
          courses = courses.concat(course);
          i++;
          _context4.next = 2;
          break;

        case 10:
          console.log(11111, courses);
          console.log(22222, courses.length);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
};

getFullCourse();
//# sourceMappingURL=index.dev.js.map
