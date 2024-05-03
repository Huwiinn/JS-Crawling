"use strict";

var axios = require("axios");

var cheerio = require('cheerio');

var nodemailer = require("nodemailer");

require("dotenv").config({
  path: "nodemailer/.env"
});

var getHTML = function getHTML(keyword) {
  var html;
  return regeneratorRuntime.async(function getHTML$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("https://www.jobkorea.co.kr/Search/?stext=".concat(keyword, "&tabType=recruit&Page_No=1")));

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
  var $, jobs, $jobList;
  return regeneratorRuntime.async(function parsing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          $ = cheerio.load(page); // 읽어들인 구인공고 목록

          jobs = [];
          $jobList = $(".post");
          _context2.prev = 3;
          $jobList.each(function (idx, node) {
            var title = $(node).find(".title:eq(0)").text().trim();
            var company = $(node).find(".name:eq(0)").text().trim();
            var exp = $(node).find(".exp:eq(0)").text().trim();
            var edu = $(node).find(".edu:eq(0)").text().trim();
            var contract = $(node).find("span:eq(2)").text().trim();
            var region = $(node).find(".loc.long:eq(0)").text().trim();
            var date = $(node).find(".date:eq(0)").text().trim();

            if (exp.includes("신입") || exp.includes("경력무관")) {
              jobs.push({
                title: title,
                company: company,
                exp: exp,
                edu: edu,
                contract: contract,
                region: region,
                date: date
              });
            }
          });
          return _context2.abrupt("return", jobs);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 8]]);
};

var getJob = function getJob(keyword) {
  var html, jobs;
  return regeneratorRuntime.async(function getJob$(_context3) {
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
          jobs = _context3.sent;
          console.log(jobs);
          return _context3.abrupt("return", jobs);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var crawlingJobs = function crawlingJobs(keyword) {
  var jobs, h, emailData;
  return regeneratorRuntime.async(function crawlingJobs$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getJob("프론트엔드"));

        case 2:
          jobs = _context4.sent;
          h = [];
          h.push("<table style=\"border:1px solid #000; border-collapse:collapse\">");
          h.push("<thead>");
          h.push("<tr>");
          h.push("<th>\uAD6C\uC778\uC81C\uBAA9</th>");
          h.push("<th>\uD68C\uC0AC\uBA85</th>");
          h.push("<th>\uACBD\uB825</th>");
          h.push("<th>\uD559\uB825</th>");
          h.push("<th>\uC815\uADDC\uC9C1 \uC5EC\uBD80</th>");
          h.push("<th>\uC9C0\uC5ED</th>");
          h.push("<th>\uAD6C\uC778 \uB9C8\uAC10\uC77C</th>");
          h.push("</tr>");
          h.push("</thead>");
          h.push("<tbody>");
          jobs.forEach(function (job) {
            h.push("<tr>");
            h.push("<td>".concat(job.title, "</td>"));
            h.push("<td>".concat(job.company, "</td>"));
            h.push("<td>".concat(job.exp, "</td>"));
            h.push("<td>".concat(job.edu, "</td>"));
            h.push("<td>".concat(job.contract, "</td>"));
            h.push("<td>".concat(job.region, "</td>"));
            h.push("<td>".concat(job.date, "</td>"));
            h.push("</tr>");
          });
          h.push("</tbody>");
          h.push("</table>");
          emailData = {
            from: "gnldls8406@naver.com",
            to: "gnldls8406@gmail.com",
            subject: "프론트엔드 구인 회사 정보",
            html: h.join("")
          };
          _context4.next = 23;
          return regeneratorRuntime.awrap(nodemailer.sendMail(emailData, function (err, info) {
            console.log(err);
          }));

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  });
};

crawlingJobs("프론트엔드");
//# sourceMappingURL=job-korea.dev.js.map
