console.log('teams.js loaded')

function fetchTeams() {
    fetch('http://localhost:3000/team')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const errorText = document.createElement('p');
                errorText.textContent = 'Aucune équipe trouvée';
                document.querySelector('.error__message').appendChild(errorText);
                return;
            }

            const teamContainer = document.getElementById('teamContainer');

            teamContainer.innerHTML = '';
            let rowContainer;


            data.forEach((team, index) => {
                if (index % 4 === 0) {
                    rowContainer = document.createElement('div');
                    rowContainer.classList.add('teams_row_container');
                    teamContainer.appendChild(rowContainer);
                }

                const teamCard = document.createElement('div');
                teamCard.classList.add('team__card');
                teamCard.id = team.team_id;

                teamCard.onclick = function() {
                    window.location.href = `/team/${team.team_id}`;
                }

                const teamFlag = document.createElement('div');
                teamFlag.classList.add('team__card__flag');
                const flagImg = document.createElement('img');
                flagImg.src = `https://flagsapi.com/${team.origin}/flat/64.png`;
                teamFlag.appendChild(flagImg);

                const teamLogo = document.createElement('div');
                teamLogo.classList.add('team__card__logo');
                const logoImg = document.createElement('img');
                logoImg.src = `/public/img/team-logos/${team.logo_path}`;
                logoImg.alt = 'team1';
                teamLogo.appendChild(logoImg);

                const teamName = document.createElement('div');
                teamName.classList.add('team__card__name');
                const nameParagraph = document.createElement('p');
                nameParagraph.textContent = team.name;
                teamName.appendChild(nameParagraph);

                teamCard.appendChild(teamFlag);
                teamCard.appendChild(teamLogo);
                teamCard.appendChild(teamName);
                rowContainer.appendChild(teamCard);
            });
        })
        .catch(error => {
            const errorText = document.createElement('p');
            errorText.textContent = 'Erreur lors de la récupération des équipes';
            document.querySelector('.error__message').appendChild(errorText);
        });
}

fetchTeams();