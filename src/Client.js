const API_BASE_URL = '/api';

export const registerUser = async (name, surname, telegram_id, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                telegram_id: telegram_id,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage;
            if (Array.isArray(responseData.detail)) {
                errorMessage = responseData.detail.map(error => error.msg).join('\n');
            } else if (typeof responseData.detail === 'string') {
                errorMessage = responseData.detail;
            } else {
                errorMessage = 'Произошла ошибка при регистрации';
            }

            alert(errorMessage);
            return false;
        } else {
            console.log('Пользователь зарегистрирован:', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
};

export const loginUser = async (telegram_id, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telegram_id: telegram_id,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage;
            if (Array.isArray(responseData.detail)) {
                errorMessage = responseData.detail.map(error => error.msg).join('\n');
            } else if (typeof responseData.detail === 'string') {
                errorMessage = responseData.detail;
            } else {
                errorMessage = 'Произошла ошибка при входе';
            }

            alert(errorMessage);
            return false;
        } else {
            localStorage.setItem('token', response.access_token);
            console.log('Успешный вход', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
}

export const getCards = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage;
            if (Array.isArray(responseData.detail)) {
                errorMessage = responseData.detail.map(error => error.msg).join('\n');
            } else if (typeof responseData.detail === 'string') {
                errorMessage = responseData.detail;
            } else {
                errorMessage = 'Произошла ошибка при получении карточек';
            }
            alert(errorMessage);
            return false;
        } else {
            console.log('Успешное получение карт', responseData);
            return responseData;
        }

    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
}
