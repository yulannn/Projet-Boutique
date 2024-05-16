document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    getProfile();
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayString = String(day).padStart(2, '0');
    const monthString = String(month).padStart(2, '0');
    return `${dayString}/${monthString}/${year}`;
}

function getProfile() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const first__name = document.getElementById('first__name');
            const last__name = document.getElementById('last__name');
            const email = document.getElementById('email');
            const created__at = document.getElementById('created__at');

            first__name.textContent = data.first_name;
            last__name.textContent = data.last_name;
            email.textContent = data.email;
            created__at.textContent = formatDate(data.created_at);
        })
        .catch(error => console.error('Error fetching profile:', error));
}


function loadSession() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const loginButton = document.getElementById('login__button');
            if (data.first_name) {
                loginButton.textContent = data.first_name;
                loginButton.href = "/profile";
            } else {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
            }
        })
}

