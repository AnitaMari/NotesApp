let notes = [
    {
        "id": 1,
        "content": "Note 1...",
        "date": "18-06-2023",
        "important": true
    },
    {
        "id": 2,
        "content": "Note 2...",
        "date": "19-06-2023",
        "important": false
    },

]

//console.log("hellooo")
const http = require("http") //forma de cargar módulos en node.js (al menos hace un par de años)
//con esto podemos crear el server (ver abajo)

const app = http.createServer((request, response) => { //callback. (Le pasamos una función que se ejecuta cuando pasa algo)
    response.writeHead(200, { "Content-Type": "application/json" }) //anteriormente había "text/plain"
    response.end(JSON.stringify(notes)) //para que devuelva las notas de arriba. Transforma la array de objetos a string. Antes pusimos "helloooo" 
}) //en este caso la función (response) se va a ejecutar cada vez que reciba una request

const PORT = 3001 //por defecto es el 80 o 443 si entras por https (ssl?)
app.listen(PORT)
console.log(`Server running on port ${PORT}`) //aparece en la terminal cuando hago npm start