console.log('teams.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const teamOrigin = document.getElementById('serveurOrigin');


    teamOrigin.addEventListener('change', fetchTeams);


    fetchTeams();
});

function fetchTeams() {
    const teamOrigin = document.getElementById('serveurOrigin');
    const origin = teamOrigin.value;

    fetch(`http://localhost:3000/team?origin=${origin}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                document.querySelector('.error__message').innerHTML = '<p>Aucune équipe trouvée</p>';
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

                const teamCard = createTeamCard(team);
                rowContainer.appendChild(teamCard);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des équipes', error);
            document.querySelector('.error__message').innerHTML = '<p>Erreur lors de la récupération des équipes</p>';
        });
}

function createTeamCard(team) {
    const teamCard = document.createElement('div');
    teamCard.classList.add('team__card');
    teamCard.id = team.team_id;

    teamCard.onclick = function () {
        window.location.href = `/team/${team.team_id}`;
    };

    const teamFlag = document.createElement('div');
    teamFlag.classList.add('team__card__flag');
    const flagImg = document.createElement('img');
    flagImg.src = `https://flagsapi.com/${team.origin}/flat/64.png`;
    teamFlag.appendChild(flagImg);

    const teamLogo = document.createElement('div');
    teamLogo.classList.add('team__card__logo');
    const logoImg = document.createElement('img');
    logoImg.src = `/public/img/team-logos/${team.logo_path}`;
    logoImg.alt = `${team.name} logo`;
    teamLogo.appendChild(logoImg);

    const teamName = document.createElement('div');
    teamName.classList.add('team__card__name');
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = team.name;
    teamName.appendChild(nameParagraph);

    teamCard.appendChild(teamFlag);
    teamCard.appendChild(teamLogo);
    teamCard.appendChild(teamName);

    return teamCard;
}
