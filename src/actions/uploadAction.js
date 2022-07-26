import * as uploadApi from "../api/UploadRequest"

export const uploadImage = (data)=> async(dispatch)=>{
    try {
        await uploadApi.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data)=>async(dispatch)=>{
    dispatch({type:'UPLOAD_START'})
    try {
        const result = await uploadApi.uploadPost(data)
        dispatch({type:'UPLOAD_SUCCESS',data:result.data})
    } catch (error) {
        dispatch({type:'UPLOAD_FAILURE'})
        console.log(error)
    }
}