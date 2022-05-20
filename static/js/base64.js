const emailencode = document.getElementById('emailencoded')
const encodedtex = emailencode.textContent
const decodedtex = atob(encodedtex)

emailencode.innerHTML = '<a class="socials-link" href=mailto:' + decodedtex + '>' + decodedtex + '</a>'
