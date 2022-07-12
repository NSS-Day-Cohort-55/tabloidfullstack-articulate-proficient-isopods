const baseUrl = "/api/UserProfile";

export const getAllUsers = () => {
    return fetch(`{baseUrl}`).then(res => res.json());
}; 