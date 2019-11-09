import actionTypes from './actionTypes';
import {getPosts} from '../services/index'

const startFetchBlogList = () => {
    return {
        type:actionTypes.START_FETCH_BLOG_LIST
    }
}

const fetchBlogListSuccess = (payload) => {
    return {
        type:actionTypes.START_BLOG_LIST_SUCCESS,
        payload
    }
}

const fetchBlogListFailed = () => {
    return {
        type:actionTypes.START_BLOG_LIST_FAILED
    }
}

export const fetchBlogList = () => dispatch => {
    dispatch(startFetchBlogList())
    getPosts().then(res => {
        if(res.status === 200){
            dispatch(fetchBlogListSuccess({
                
                list:res.data
            }))
        }else{
            dispatch(fetchBlogListFailed())
        }
    }).catch(error => {
        dispatch(fetchBlogListFailed())
    })
}