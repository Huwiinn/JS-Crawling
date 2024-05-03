// axios - 특정 웹사이트 페이지 내용 가져오기
// cheerio - HTML 구조를 가지고 있는 일반 텍스트들

const axios = require("axios");
const cheerio = require('cheerio');



// 페이지의 내용을 긁어와서 해당 변수에 자료를 저장함.
const getHTML = async (keyword) => {
try {
    const html = (await axios.get(`https://www.inflearn.com/courses?s=${encodeURI(keyword)}`)).data;
    return html;
} catch(err) {
    console.log("err : ", err)
}
}

const parsing = async (page) => {
    const $ = cheerio.load(page);
    // 읽어들인 강의 목록
    const courses = [];

    const $coursesList = $(".course_card_item");

    // console.log(1111111, $coursesList.length)

    $coursesList.each((idx, node) => {
        // :eq는 제이쿼리 선택자 문법임
        const title = $(node).find(".course_title:eq(0)").text();
        const instructor = $(node).find(".instructor:eq(0)").text();
        let price = 0;
        let ogPrice = 0;
        if ( $(node).find(".pay_price").length > 0 ) {
            price = $(node).find(".pay_price:eq(0)").text();
            ogPrice = $(node).find("del:eq(0)").text();
        } else {
            price = $(node).find(".price:eq(0)").text();
        }

        const rating = Math.round(parseFloat( $(node).find(".star_solid").css("width").slice(0, -1)));
        const reviewCount = $(node).find(".review_cnt").text().slice(1, -1);
        const imgSrc = $(node).find(".card-image > figure > img").attr('src');

        courses.push({title, instructor, price, ogPrice, imgSrc, rating})
    })

    return courses
}

const getCourse = async (keyword) => {
    const html = await getHTML(keyword);

    // 긁어온 내용을 넣음
    const courses = await parsing(html);
    console.log(courses);
    return courses
}

const getFullCourse = async () => {
let courses = [];
let i = 1;
    while (1 <= 20) {
    const course = await getCourse(`자바스크립트&order=search&page=${i}`)
    courses = courses.concat(course);
    i++;
} 

console.log(11111, courses)
console.log(22222, courses.length)
}

getFullCourse();

