import Replicate from 'replicate'

const replicate = new Replicate({
  auth: useRuntimeConfig().replicateApikey
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ws_key, input } = body

  const prediction = await replicate.predictions.create({
    version: '27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478',
    input,
    webhook: `https://r3swiuknhh.execute-api.eu-west-1.amazonaws.com/prod/webhook?key=${ws_key}`,
    webhook_events_filter: ['start', 'output', 'logs', 'completed']
  })

  return prediction
})
