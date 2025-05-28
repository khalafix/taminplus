import useSWR from 'swr';
import axios from 'axios'
import { SERVER_ADDRESS } from "constants/configs";

const fetcher = url => axios.get(url).then(res => res.data.items);



// export function useGetHello() {
//     return useSWR('/api/hello', fetcher);
// }



// // export function useGetPosts(initialData , offset = 0) {
// //     return useSWR(`/api/article?offset=${offset || 0}`, fetcher , {initialData});
// // }



// export function useGetMenus() {
//     return useSWR(SERVER_ADDRESS + "/Menu/Get", fetcher);
// }

// export function useGetFooterLinks() {
//     return useSWR(SERVER_ADDRESS + "/FooterLink/Get?IncludeRelations=true", fetcher);
// }

// export function useGetSocialNetworks() {
//     return useSWR(SERVER_ADDRESS + "/SocialNetwork/Get", fetcher);
// }

// export function useGetArticles() {
//     return useSWR(SERVER_ADDRESS + "/Article/Get?Count=5&IncludeMedia=true", fetcher);
// }

// export   function useGetArticleCategories() {
    
//     // let result =  await articleCategoryServices.getAll();
//     // // // setArticleCategory(result.data)
//     // // return useSWR( result.data , fetcher);
//     //        return result.data;
//     return useSWR(SERVER_ADDRESS + "/ArticleCategory/Get", fetcher);
// }



