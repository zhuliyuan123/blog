import { baseUrl } from '@/config/base';
import {createRequestFunc} from '../../common/ajax';


const user = {
    login:{
        path:'/login',
        method:'post'
    }
}


export default createRequestFunc(user,baseUrl)