document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');

    fetch("http://localhost:3000/team")
        .then(response => response.json())
        .then(data => {
            data.forEach(team => {
                const teamDiv = document.createElement('div');
                teamDiv.classList.add('team');

                const teamTitle = document.createElement('h1');
                const teamOrigin = document.createElement('p');
                const teamId = document.createElement('p');

                teamTitle.innerHTML = team.name;
                teamOrigin.innerHTML = team.origin;
                teamId.innerHTML = team.team_id;

                teamDiv.appendChild(teamTitle);
                teamDiv.appendChild(teamOrigin);
                teamDiv.appendChild(teamId);

                container.appendChild(teamDiv);

            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
