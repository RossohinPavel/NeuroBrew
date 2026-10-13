import fastify from 'fastify'

const server = fastify({
  logger: true
})

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server listening at ${address}`)
})