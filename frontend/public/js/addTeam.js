const form = document.querySelector('#teamForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const teamName = document.querySelector('#teamName').value;
    const teamOrigin = document.querySelector('#teamOrigin').value;
    const teamLogo = document.querySelector('#teamLogo').value;
    const status = document.querySelector('.status');

    const response = await fetch('http://localhost:3000/team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamName, teamOrigin, teamLogo })
    });

    const result = document.createElement('p');
    status.appendChild(result);

    if (response.ok) {
        console.log('Team added successfully');
        result.style.color = 'green';
        result.textContent = 'Team added successfully';

    } else {
        console.error('Failed to add team');
        result.style.color = 'red';
        result.textContent = 'Failed to add team';
    }
});