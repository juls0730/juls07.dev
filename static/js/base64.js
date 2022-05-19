const emailencoded = document.getElementById('emailencoded')
let encodedtext = emailencoded.textContent
let decodedtext = atob(encodedtext)

emailencoded.innerHTML = '<a class="socials-link" href=mailto:' + decodedtext + '>' + decodedtext + '</a>'