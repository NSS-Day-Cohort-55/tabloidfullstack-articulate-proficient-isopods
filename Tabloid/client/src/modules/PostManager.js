const baseUrl = "/api/Post"

export const getAllPosts = () =>{
    return fetch(baseUrl)
        .then(res => res.json())
}

export const getPostById = (id) =>{
    return fetch(`${baseUrl}/${id}`)
        .then(res => res.json())
}