import { baseUrl } from '@/config/base';
import {createRequestFunc} from '../../common/ajax';


const classes = {
    getClassList:{
        path:'/getClassList',
        method:'get'
    },
    addClass:{
        path:'/addClass',
        method:'post'
    },
    delClass:{
        path:'/delClass',
        method:'post',
    },
    updateClass:{
        path:'/updateClass',
        method:'post'
    }
}


export default createRequestFunc(classes,baseUrl)