const baseUrl = "/api/Post"

export const getAllPosts = () =>{
    return fetch(baseUrl)
        .then(res => res.json())
}

export const getPostById = (id) =>{
    return fetch(`${baseUrl}/${id}`)
        .then(res => res.json())
}

export const editPost = (post) =>{
    return fetch(`${baseUrl}/${post.id}`,{
        method: "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

}

export const addPost = (postObj) =>{
    return fetch(`${baseUrl}/${postObj.id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
}

export const deletePost = (postObj) =>{
    return fetch(`${baseUrl}/${postObj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
}