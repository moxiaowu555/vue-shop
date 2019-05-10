import axios from 'axios'

// 设置 baseURL
const baseURL = 'http://www.liulongbin.top:3005/'
axios.defaults.baseURL = baseURL

// 获取新闻资讯列表
export const getNewsList = () => {
  return axios.get('api/getnewslist').then(res => res.data)
}
// 获取新闻详情
export const getNewsInfo = params => {
  return axios.get(`api/getnew/${params}`).then(res => res.data)
}
// 获取评论数据
export const getComment = params => {
  return axios.get(`api/getcomments/${params.id}?pageindex=${params.pageIndex}`).then(res => res.data)
}
// 提交评论
export const postComment = params => {
  return axios.post(`api/postcomment/${params.id}`, { content: params.content }).then(res => res.data)
}
// 获取图片分类
export const getCategory = () => {
  return axios.get('api/getimgcategory').then(res => res.data)
}
// 根据分类ID 获取图片列表
export const getPhotosById = params => {
  return axios.get(`api/getimages/${params}`).then(res => res.data)
}
// 根据图片id 获取图片详情
export const getPhotoInfoById = params => {
  return axios.get(`api/getimageInfo/${params}`).then(res => res.data)
}
// 根据id获取缩略图
export const getThumImgById = params => {
  return axios.get(`api/getthumimages/${params}`).then(res => res.data)
}
// 获取商品列表
export const getGoodsList = params => {
  return axios.get(`api/getgoods?pageindex=${params}`).then(res => res.data)
}
// 根据id获取商品详情页
export const getGoodsInfoById = params => {
  return axios.get(`api/goods/getinfo/${params}`).then(res => res.data)
}
// 根据 id 获取商品图文详情
export const getGoodsDescById = params => {
  return axios.get(`api/goods/getdesc/${params}`).then(res => res.data)
}
// 获取购物车页面商品数据
export const getShopcarList = params => {
  return axios.get(`api/goods/getshopcarlist/${params}`).then(res => res.data)
}