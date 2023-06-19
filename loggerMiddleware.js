const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('-------')
  next() // si no ponemos el next se queda aquí. Ahora veremos que en la consola va al siguiente middleware (path) que sería get etc
}

module.exports = logger
