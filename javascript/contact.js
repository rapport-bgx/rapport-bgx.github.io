let submitCounter = 0;
let lastSubmitTime = 0;

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    const discordWebhookUrl = 'https://discord.com/api/webhooks/1253280756151877682/DzNZ0mpD1mekcUvQ-Go-x32ddlr2oxCnqOO3a2Gc_h9LQITEa-7C3ln4RjAHzFrnZr6R';

    // Check if the message contains "Babar", "BABAR", or "Robin"
    if (message.includes("Babar") || message.includes("BABAR") || message.includes("Robin")) {
        message = message.replace(/Babar|BABAR|Robin/g, '**$&**');
        const payload = {
            content: `**Nouveau message de contact**\n\n**Nom:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
        };

        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if(response.ok) {
                alert('Message envoyé avec succès!');
            } else {
                alert('Erreur lors de l\'envoi du message.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi du message.');
        });

    } else {
        // Check for spamming/bot action
        const currentTime = Date.now();
        if (currentTime - lastSubmitTime < 10000) { // 10 seconds window
            submitCounter++;
        } else {
            submitCounter = 1;
        }
        lastSubmitTime = currentTime;

        if (submitCounter >= 3) {
            message += "\n\n** :exclamation: Alerte : Spam/Bot**";
        }

        // Get user's IP address using an external API
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const userIP = data.ip;

                // Get geolocation data using ipapi
                fetch(`https://ipapi.co/${userIP}/json/`)
                    .then(response => response.json())
                    .then(locationData => {
                        const city = locationData.city;
                        const country = locationData.country_name;
                        const isp = locationData.org;

                        // Check for phone numbers in the message
                        const phoneNumberRegex = +123075-63546725;
                        const phoneNumbers = message.match(phoneNumberRegex);
                        const phoneNumberString = phoneNumbers ? `**Phone Numbers:** ${phoneNumbers.join(', ')}` : '';

                        const payload = {
                            content: `**Nouveau message de contact**\n\n**Nom:** ${name}\n**Email:** ${email}\n**Message:** ${message}\n**IP:** ${userIP}\n**Location:** ${city}, ${country}\n**ISP:** ${isp}\n${phoneNumberString}`
                        };

                        fetch(discordWebhookUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        })
                        .then(response => {
                            if(response.ok) {
                                alert('Message envoyé avec succès!');
                            } else {
                                alert('Erreur lors de l\'envoi du message.');
                            }
                        })
                        .catch(error => {
                            console.error('Erreur:', error);
                            alert('Erreur lors de l\'envoi du message.');
                        });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des informations de localisation:', error);
                        alert('Erreur lors de la transmission de votre message. Merci de vérifier votre connexion.');
                    });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'adresse IP:', error);
                alert('Erreur lors de la transmission de votre message. Merci de vérifier votre connexion.');
            });
    }
});
