
import axios from 'axios';
var _ = require('lodash');
import { SERVER_ADDRESS } from "constants/configs";

// const axioss = axios.create({
//     baseURL: `${SERVER_ADDRESS}/`
// });


// export async function getHomePagePosts() {
//     const result = await axioss.get("Article/Get?Count=3&IncludeMedia=true&IncludeRelations=true");
//     return result.data.items;
// }

// export async function getHomePageRate() {
//     const result = await axioss.get("Feedback/Rate");
    
//     return result.data;
// }

// export async function getHomePageFaqs() {
//     const result = await axioss.get("Faq/Get?Filters=ShowInHome=true");
//     result.data.items = _.orderBy(result.data.items , ['priority'])
//     return result.data.items;
// }


// export async function getHomePageAbout() {
//     const result = await axioss.get("HomeAbout/Get/1?IncludeMedia=true");
//     return result.data;
// }


// export async function getHomePageServices() {
//     const result = await axioss.get("Service/Get");
//     return result.data.items;
// }


// export async function getHomePageTestimonial() {
//     const result = await axioss.get("CustomerVoice/Get?IncludeMedia=true");
//     return result.data.items;
// }


// export async function getHomePageCarousels() {
//     const result = await axioss.get("Carousel/Get?IncludeMedia=true");
//     return result.data.items;
// }


// export async function getMenus() {
//     const result = await axioss.get("Menu/Get?IncludeRelations=true");
//     return result.data.items;
// }


// export async function getAllPosts(pageNumber) {
//     const result = await axioss.get(`Article/Get?PageNumber=${pageNumber}&Count=12&IncludeMedia=true&IncludeRelations=true`)
//     return result;
// }


// export async function getPostCategories() {
//     const result = await axioss.get(`ArticleCategory/Get`)
//     return result;
// }

// export async function getPostsSlugs() {
//     const result = await axioss.get(`Article/Get`);
//     return result;
// }

// export async function getPostByTitle(seoUrl) {
//     var result = await axioss.get(`Article/GetBySeoUrl/${encodeURI(seoUrl)}`);
//     return result.data;
// }


// export async function getDesignedLogo() {
//     var result = await axioss.get(`sample/list`);
//     return result.data;
// }

// export async function getPageBySeourl(seoUrl) {
//     var result = await axioss.get(`StaticPage/GetBySeoUrl/${encodeURI(seoUrl)}`);
//     return result.data;
// }

// export async function getPagesSeourl() {
//     var result = await axioss.get(`StaticPage/Get`);
//     return result;
// }

// export async function getFooterLinks() {
//     var result = await axioss.get(`FooterLink/Get?IncludeRelations=true`);
//     return result.data;
// }


// export async function getSocialNetworks() {
//     var result = await axioss.get(`SocialNetwork/Get`);
//     return result.data;
// }

// export async function getTeachersIds() {
//     const result = await axioss.get(`Teacher/Get`);
//     return result.data;
// }

// export async function getSingleTeacher(id) {
//     const result = await axioss.get(`Teacher/Get/${id}`)
//     return result.data;
// }


// export async function getUserOrderHistory(userId) {
//     const result = await axioss.get(`User/GetCourses/${userId}`)
//     return result.data;
// }



// export async function getCourses() {
//     const result = await axioss.get(`Course/Get?IncludeMedia=true`)
//     return result.data;
// }


// export async function getSingleCourse(id) {
//     const result = await axioss.get(`Course/GetDetails/${id}?IncludeMedia=true&IncludeRelations=true`)
//     return result.data;
// }


// export async function getCourseLessons(courseId) {
//     const result = await axioss.get(`CourseLesson/Get?IncludeMedia=true&Filters=CourseId=${courseId}&IncludeRelations=true`)
//     return result.data;
// }


// export async function getSingleCourseLesson(lessonId) {
//     const result = await axioss.get(`CourseLesson/Get/${lessonId}?IncludeMedia=true&IncludeRelations=true`)
//     return result.data;
// }


// export async function getUserOrders(userId) {
//     const result = await axioss.get(`User/GetCourseOrders/${userId}`);
//     return result.data;
// }


// export async function getHomePageBanner() {
//     const result = await axioss.get(`Banner/Get?IncludeMedia=true`);
//     return result.data;
// }
