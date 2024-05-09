document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            email: formData.get('email'),
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            password: formData.get('password')
        };


        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            alert('Une erreur s\'est produite lors de l\'inscription.');
        }
    });
});