import https from './http.js'

//api.js
// 文章标签列表
// home 主页 class1为文章列表  tag
export const list =data=> {
    return https({
        url: '/api/list'+data,
        method: 'GET',
    })
};
// media  的值为 tag  user class
export const media = data=>{
    return https({
        url: '/api/media?media='+data,
        method: 'GET',
    })
}
// 点击量埋点
export const whites= data=>{
    return https({
        url:'/api/write',
        method:'POST',
        data
    })
}
// find 搜索
export const findsa= data =>{
    return https({
        url:'/api/find?finds='+data,
        method:'GET'
    })
}
// 时间轴
export const time= data =>{
    return https({
        url:'/api/time?time='+data,
        method:'GET'
    })
}
time


