import { baseUrl } from '@/config/base';
import {createRequestFunc} from '../../common/ajax';


const article = {
    getArticleList:{
        path:'/getArticleList',
        method:'get',
    },
    getArticle:{
        path:'/getArticle',
        method:'get'
    },
    addArticle:{
        path:'/addArticle',
        method:'post'
    },
    delArticle:{
        path:'/delArticle',
        method:'post'
    },
    updateArticle:{
        path:'/updateArticle',
        method:'post'
    }

}


export default createRequestFunc(article,baseUrl)