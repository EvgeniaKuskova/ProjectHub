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
        }
        else {
            console.log('Пользователь зарегистрирован:', responseData);
        }
        return true;

    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
};
