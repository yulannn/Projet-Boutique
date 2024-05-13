function fetchTeam() {
    const teamId = window.location.pathname.split('/')[2];

    fetch(`http://localhost:3000/team/${teamId}`)
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


            /*const teamName = document.createElement('h1');
            teamName.textContent = data.name;
            teamName.id = 'teamName';
            headDisplay.appendChild(teamName);*/

            teamContainer.appendChild(headDisplay);

            const teamDescription = document.createElement('p');
            teamDescription.textContent = data.description;
            teamDescription.id = 'teamDescription';
            teamContainer.appendChild(teamDescription);

        })
}


function fetchPlayers() {
    const teamId = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/players/team/${teamId}`)
        .then(response => response.json())
        .then(data => {
            const playersContainer = document.querySelector('.players__display');
            playersContainer.innerHTML = '';

            const teamPlayers = document.createElement('h2');
            teamPlayers.textContent = 'Joueurs';
            teamPlayers.id = 'teamPlayersText';
            playersContainer.appendChild(teamPlayers);

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

                playersContainer.appendChild(playerContainer);
            });
        })
}

fetchPlayers();
fetchTeam();