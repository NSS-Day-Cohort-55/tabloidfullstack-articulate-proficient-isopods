const baseUrl = "/api/Tag";

export const getAllTags = () => {
  return fetch(baseUrl).then((res) => res.json());
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