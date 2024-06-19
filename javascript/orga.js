document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const addPersonBtn = document.getElementById('addPersonBtn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('addPersonForm');
    const teamContainer = document.querySelector('.team');

    addPersonBtn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const photo = document.getElementById('photo').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        const newCard = document.createElement('div');
        newCard.classList.add('team-card');

        const img = document.createElement('img');
        img.src = photo;
        img.alt = 'Photo';
        img.classList.add('team-photo');

        const nameElem = document.createElement('h3');
        nameElem.classList.add('team-name');
        nameElem.textContent = name;

        const descElem = document.createElement('p');
        descElem.classList.add('team-description');
        descElem.textContent = description;

        newCard.appendChild(img);
        newCard.appendChild(nameElem);
        newCard.appendChild(descElem);

        teamContainer.appendChild(newCard);

        modal.style.display = 'none';
        form.reset();
    });
});
