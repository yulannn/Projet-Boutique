document.addEventListener('DOMContentLoaded', function () {
    loadSession();
    fetchTeam();
    fetchPlayers();
    fetchJerseys();

    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

function fetchTeam() {
    const teamId = window.location.pathname.split('/')[2];

    fetch(`http://localhost:3000/api/team?team_id=${teamId}`)
        .then(response => response.json())
        .then(data => {
            data = data[0];
            const teamContainer = document.querySelector('.team__display');
            teamContainer.innerHTML = '';

            const headDisplay = document.createElement('div');
            headDisplay.classList.add('team__head__display');

            const logoImg = document.createElement('img');
            logoImg.src = `/public/img/team-logos/${data.logo_path}`;
            logoImg.alt = `${data.name} logo`;
            logoImg.id = 'teamLogo';
            headDisplay.appendChild(logoImg);


            const teamName = document.createElement('h1');
            teamName.textContent = data.name;
            teamName.id = 'teamName';
            headDisplay.appendChild(teamName);

            teamContainer.appendChild(headDisplay);

            const teamDescription = document.createElement('p');
            teamDescription.textContent = data.description;
            teamDescription.id = 'teamDescription';
            teamContainer.appendChild(teamDescription);

        })
}

function loadSession() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const loginButton = document.getElementById('login__button');
            const loginBurgerButton = document.getElementById('login__burger__button');
            if (data.first_name) {
                loginButton.textContent = data.first_name;
                loginButton.href = "/profile";
                loginBurgerButton.textContent = data.first_name;
                loginBurgerButton.href = "/profile";
            } else {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
                loginBurgerButton.textContent = "Login";
                loginBurgerButton.href = "/login";
            }
        })
}

function fetchPlayers() {
    const teamId = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/api/players?team_id=${teamId}`)
        .then(response => response.json())
        .then(data => {
            const playersContainer = document.querySelector('.players__display');
            playersContainer.innerHTML = '';

            const infosContainer = document.createElement('div');
            infosContainer.classList.add('infos__container');

            data.forEach(player => {
                const playerContainer = document.createElement('div');
                playerContainer.classList.add('player__container');


                const laneImage = document.createElement('img');
                laneImage.src = `/public/img/lol-assets/${player.lane}.png`;
                laneImage.alt = `${player.lane}`;
                laneImage.classList.add('player__lane');
                playerContainer.appendChild(laneImage);

                const playerName = document.createElement('h2');
                playerName.textContent = player.first_name + ' "' + player.pseudo + '" ' + player.last_name + ' , ' + player.age;
                playerName.classList.add('player__name');
                playerContainer.appendChild(playerName);

                const playerFlag = document.createElement('img');
                playerFlag.src = `https://flagsapi.com/${player.origin}/flat/64.png`;
                playerFlag.alt = `${player.origin}`;
                playerFlag.id = 'player__flag';
                playerContainer.appendChild(playerFlag);

                playerContainer.addEventListener('click', () => {
                    const imageContainer = document.querySelector('#player__image');
                    imageContainer.src = `/public/img/players-images/${player.pseudo}.webp`;
                    imageContainer.alt = `Image of ${data[0].pseudo}`;
                });

                infosContainer.appendChild(playerContainer);
            });

            playersContainer.appendChild(infosContainer);

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image__container');

            const defaultImage = document.createElement('img');
            defaultImage.src = `/public/img/players-images/${data[0].pseudo}.webp`;
            defaultImage.alt = `Image of ${data[0].pseudo}`;
            defaultImage.classList.add('player__image');
            defaultImage.id = 'player__image';
            imageContainer.appendChild(defaultImage);

            playersContainer.appendChild(imageContainer);
        })
}


function fetchJerseys() {
    const teamId = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/api/jerseys?team_id=${teamId}`)
        .then(response => response.json())
        .then(data => {
            const jerseysContainer = document.querySelector('.jerseys__display');
            jerseysContainer.innerHTML = '';


            data.forEach(jersey => {
                const jerseyContainer = document.createElement('div');
                jerseyContainer.classList.add('jersey__container');

                const jerseyImage = document.createElement('img');
                jerseyImage.src = `/public/img/jersey-images/${jersey.url_path}`;
                jerseyImage.alt = `${jersey.name}`;
                jerseyImage.classList.add('jersey__image');
                jerseyContainer.appendChild(jerseyImage);

                const jerseyName = document.createElement('h2');
                jerseyName.textContent = jersey.name;
                jerseyName.classList.add('jersey__name');
                jerseyContainer.appendChild(jerseyName);

                jerseyContainer.addEventListener('click', () => {
                    window.location.href = `/jersey/${jersey.id_jersey}`;
                });
                jerseysContainer.appendChild(jerseyContainer);
            });
        })
}
