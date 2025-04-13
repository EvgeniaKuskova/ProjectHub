const API_BASE_URL = 'http://158.160.155.123:8000';

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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Ошибка регистрации');
        }

        const userData = await response.json();
        console.log('Пользователь зарегистрирован:', userData);
        return userData;
    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
};
