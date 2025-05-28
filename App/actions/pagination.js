import ArticleThumb from 'components/ArticleThumb';
import ArticleThumbPlaceHolder from 'components/ArticleThumbPlaceHolder';
import useSWR, { useSWRInfinite } from 'swr';
import { use } from 'swr';
import { useGetPosts } from './index';
import { getAllPosts } from 'lib/api';
import axios from 'axios'
import { SERVER_ADDRESS } from "constants/configs";

const fetcher = url => axios.get(url).then(res => res.data)

export const useGetDesignedLogos = () => {
  const result = useSWRInfinite(
    (index, previousPageData) => {


      if (previousPageData && !previousPageData.length) return null
      return `${SERVER_ADDRESS}/DesignedLogo/Get?PageNumber=${index}&Count=20`;
    },
    fetcher,
  )

  let hitEnd = false;
  const { data } = result;

  if (data) {
    hitEnd = data[data.length - 1].length === 0
  }
  return { ...result, hitEnd }
}


export const useGetBlogPages = (initialData, pageNumber, articleCategoryId) => {

  if (articleCategoryId) {
    return useSWR(`${SERVER_ADDRESS}/Article/Get?PageNumber=${pageNumber}&Count=12&IncludeMedia=true&IncludeRelations=true&Filters=ArticleCategoryId=${articleCategoryId}`, fetcher, { initialData: undefined });
  }
  return useSWR(`${SERVER_ADDRESS}/Article/Get?PageNumber=${pageNumber}&Count=12&IncludeMedia=true&IncludeRelations=true`, fetcher, { initialData });
}