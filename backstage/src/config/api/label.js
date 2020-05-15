import { baseUrl } from '@/config/base';
import {createRequestFunc} from '../../common/ajax';


const label = {
    getLabelList:{
        path:'/getLabelList',
        method:'get'
    },
    addLabel:{
        path:'/addLabel',
        method:'post',
    },
    delLabel:{
        path:'/delLabel',
        method:'post'
    },
    updateLabel:{
        path:'/updateLabel',
        method:'post'
    }
}


export default createRequestFunc(label,baseUrl)