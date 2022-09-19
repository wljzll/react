export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const onLocationChange = (location, action) => ({
    type: LOCATION_CHANGE,
    payload: {
        location,
        action
    }
})


export const CALL_HISTROY_METHOD = '@@router/CALL_HISTORY_METHDO';

/**
 * 这个函数的核心就是生成一个action对象
 * @param {*} method 方法名 
 * @returns 
 */
const updateLocation = (method) => {
    return (...args) => ({
        type: CALL_HISTROY_METHOD,
        payload: {
            method,
            args
        }
    })
}

export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');