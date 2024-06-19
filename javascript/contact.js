document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:emarque769@gmail.com?subject=Message de ${encodeURIComponent(name)}&body=${encodeURIComponent(message)} (${encodeURIComponent(email)})`;

    window.location.href = mailtoLink;
});
