const axios = require("axios");
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");
require("dotenv").config ({path : "nodemailer/.env"});



const getHTML = async (keyword) => {    
    try {
        const html = (await axios.get(`https://www.jobkorea.co.kr/Search/?stext=${(keyword)}&tabType=recruit&Page_No=1`)).data

        return html;
    } catch (err) {
        console.log("err : ", err)
    }
}

const parsing = async (page) => {

    const $ = cheerio.load(page);
    
    // 읽어들인 구인공고 목록
    const jobs = [];
    const $jobList = $(".post")
    
    try {

    $jobList.each((idx, node) => {
        const title = $(node).find(".title:eq(0)").text().trim();
        const company = $(node).find(".name:eq(0)").text().trim();
        const exp = $(node).find(".exp:eq(0)").text().trim();
        const edu = $(node).find(".edu:eq(0)").text().trim();
        const contract = $(node).find("span:eq(2)").text().trim();
        const region = $(node).find(".loc.long:eq(0)").text().trim();
        const date = $(node).find(".date:eq(0)").text().trim();


        if (exp.includes("신입") || exp.includes("경력무관") ) {
             jobs.push({
            title, company, exp, edu, contract, region, date
        }) 
        }

       
    })
        return jobs
        
    } catch (err) {
        console.log(err)
    }
    
}

const getJob = async (keyword) => {
    const html = await getHTML(keyword);
    const jobs = await parsing(html)
    console.log(jobs)
    return jobs;
}

const crawlingJobs = async (keyword) => {
    const jobs = await getJob("프론트엔드")
    
    const h = [];
    
    h.push(`<table style="border:1px solid #000; border-collapse:collapse">`)
    h.push(`<thead>`)
    h.push(`<tr>`)
    h.push(`<th>구인제목</th>`)
    h.push(`<th>회사명</th>`)
    h.push(`<th>경력</th>`)
    h.push(`<th>학력</th>`)
    h.push(`<th>정규직 여부</th>`)
    h.push(`<th>지역</th>`)
    h.push(`<th>구인 마감일</th>`)
    h.push(`</tr>`)
    h.push(`</thead>`)
    h.push(`<tbody>`)
    jobs.forEach(job => {
        h.push(`<tr>`)
        h.push(`<td>${job.title}</td>`)
        h.push(`<td>${job.company}</td>`)
        h.push(`<td>${job.exp}</td>`)
        h.push(`<td>${job.edu}</td>`)
        h.push(`<td>${job.contract}</td>`)
        h.push(`<td>${job.region}</td>`)
        h.push(`<td>${job.date}</td>`)
        h.push(`</tr>`)
    })
    h.push(`</tbody>`)
    h.push(`</table>`)

    const emailData = {
        from: "gnldls8406@naver.com",
        to: "gnldls8406@gmail.com",
        subject: "프론트엔드 구인 회사 정보",
        html : h.join("")
    }

    await nodemailer?.sendMail(emailData, (err, info) => {
        console.log(err)
    });
}

crawlingJobs("프론트엔드");
