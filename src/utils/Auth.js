export const BASE_URL = 'https://auth.nomoreparties.co';

function getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (userPassword, userEmail) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: userPassword,
            email: userEmail
    })
    })
        .then(res =>
            getResponseData(res)
        );}

export const authorize = (userPassword, userEmail) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: userPassword,
            email: userEmail
        })
    })
        .then(res =>
            getResponseData(res)
        );}

export const checkAuth = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res =>
            getResponseData(res)
        );}