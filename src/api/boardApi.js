import axiosClient from "./axiosClient.js"


const boardApi={
    create:()=>axiosClient.post('boards'),
    getAll:()=>axiosClient.get('boards'),
    updatePosition:(params)=>axiosClient.put('boards',params),
    getOne:(id)=>axiosClient.get(`boards/${id}`),
    update:(id,params)=> axiosClient.put(`boards/${id}`,params),
    getFavourites:()=>axiosClient.get('boards/favourites'),
    updateFavouritePosition:(params)=>axiosClient.put('boards/favourites',params),
    deleteBoard:(id)=>axiosClient.delete(`boards/${id}`)
}

export default boardApi;