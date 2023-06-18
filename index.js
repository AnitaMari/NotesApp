const express = require("express") //1
const app = express() //2

app.use(express.json()) //para el body.parser del post

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
    {
        "id": 3,
        "content": "Note 3...",
        "date": "19-06-2023",
        "important": false
    },
    {
        "id": 4,
        "content": "Note 4...",
        "date": "19-06-2023",
        "important": false
    },

]

//decirlo el path y el callback, qué tiene que devolver
app.get("/", (request, response) => {
    response.send("<h1>Hi there!<h1>") //express detecta que es html. Se puede ver en inspect, network, header, all, localhost, content-type
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id) //si no ponemos lo de number convierte el número a string y no lo encuentra
    //console.log({id})
    const note = notes.find(note => note.id === id)
    //console.log({note})

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }   
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end() //no content
})

app.post("/api/notes", (request, response) => {
    const note = request.body
    //console.log(note)

    if (!note || !note.content) {
        return response.status(400).json({
            error: "note.content is missing"
        })
    }
    
    const ids = notes.map(note => note.id) //tenemos que general la id
    const maxId = Math.max(...ids)

    const newNote = { 
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== "undefined" ? note.important : false, 
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]
    //o notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

//console.log("hellooo")
//poner lo de express arriba y quitar esto de abajo:
//const http = require("http") //forma de cargar módulos en node.js (al menos hace un par de años)
//con esto podemos crear el server (ver abajo)

//todo esto de abajo se simplifica arriba con express
// const app = http.createServer((request, response) => { //callback. (Le pasamos una función que se ejecuta cuando pasa algo)
//     response.writeHead(200, { "Content-Type": "application/json" }) //anteriormente había "text/plain"
//     response.end(JSON.stringify(notes)) //para que devuelva las notas de arriba. Transforma la array de objetos a string. Antes pusimos "helloooo" 
// }) //en este caso la función (response) se va a ejecutar cada vez que reciba una request

//cambia un poco esto con express porque el servidor se inicia de forma asíncrona (ya está actualizado)
const PORT = 3001 //por defecto es el 80 o 443 si entras por https (ssl?)
app.listen(PORT), () => { //primero espera y después ejecuta lo siguiente
    console.log(`Server running on port ${PORT}`) //aparece en la terminal cuando hago npm start
}