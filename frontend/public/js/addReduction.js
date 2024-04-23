const form = document.querySelector('#reductionForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.querySelector('#description').value;
    const pourcentage = document.querySelector('#pourcentage').value;
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    const status = document.querySelector('.status');

    const response = await fetch('http://localhost:3000/reductions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, pourcentage, startDate, endDate})
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