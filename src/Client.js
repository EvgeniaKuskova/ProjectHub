const API_BASE_URL = '/api';

const checkError = (responseData) => {
    let errorMessage;
    if (responseData.detail) {
        if (Array.isArray(responseData.detail)) {
            errorMessage = responseData.detail.map(error => error.msg).join('\n');
        } else if (typeof responseData.detail === 'string') {
            errorMessage = responseData.detail;
        } else {
            errorMessage = 'Произошла ошибка';
        }
    } else if (responseData.message) {
        errorMessage = responseData.message;
    } else if (typeof responseData === 'string') {
        errorMessage = responseData;
    }
    
    alert(errorMessage);
    return false;
}

export const registerUser = async (name, surname, telegram_id, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, surname, telegram_id, password}),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return checkError(responseData);
        } else {
            console.log('Пользователь зарегистрирован:', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка сети');
        return false; 
    }
};

export const loginUser = async (telegram_id, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({telegram_id, password}),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return checkError(responseData);
        } else {
            localStorage.setItem('token', responseData.access_token);
            console.log('Успешный вход', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка сети');
        return false; 
    }
}

export const getCards = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            return checkError(responseData);
        } else {
            console.log('Успешное получение карт', responseData);
            return responseData;
        }

    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка сети');
        return false; 
    }
}

export const createCard = async (cardData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(cardData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return checkError(responseData);
        } else {
            console.log('Объявление опубликовано:', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка сети');
        return false; 
    }
};
