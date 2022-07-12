const baseUrl = "/api/Tag";

export const getAllTags = () => {
  return fetch(baseUrl).then((res) => res.json());
}