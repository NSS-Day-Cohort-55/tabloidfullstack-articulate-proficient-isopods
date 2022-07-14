const baseUrl = "/api/Tag";

export const getAllTags = () => {
  return fetch(baseUrl).then((res) => res.json());
}

export const getTagById = (tagId) => {
  return fetch(`${baseUrl}/${tagId}`)
  .then(res => res.json())
}

export const getTagsByName = (name) => {
  return fetch(`${baseUrl}/name?name=${name}`)
  .then(res => res.json())
}

export const addTag = (newTag) => {
  return fetch (`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTag)
  }).then(res => res.json())
}

export const deleteTag = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  })
}

export const updateTag = (tagObj) => {
  return fetch(`${baseUrl}/${tagObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(tagObj)
  })
}