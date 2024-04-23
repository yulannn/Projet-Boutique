const form = document.querySelector('#jerseyForm');

document.addEventListener('DOMContentLoaded', function() {
    const url = 'http://localhost:3000/team';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const selectElement = document.getElementById('team-select');

            data.forEach(team => {
                const option = document.createElement('option');
                option.value = team.team_id;
                option.textContent = team.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.querySelector('#nom').value;
    const prix = document.querySelector('#prix').value;
    const taille = document.querySelector('#taille').value;
    const stock = document.querySelector('#stock').value;
    const description = document.querySelector('#description').value;
    const matiere = document.querySelector('#matiere').value;
    const couleur = document.querySelector('#couleur').value;
    const id_team = document.querySelector('#team-select').value;

    const status = document.querySelector('.status');

    const response = await fetch('http://localhost:3000/jerseys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom, prix, taille, stock, description, matiere, couleur, id_team})
    });

    const result = document.createElement('p');
    status.appendChild(result);

    if (response.ok) {
        console.log('Jersey added successfully');
        result.style.color = 'green';
        result.textContent = 'Team added successfully';

    } else {
        console.error('Failed to add Jersey');
        result.style.color = 'red';
        result.textContent = 'Failed to add team';
    }
});