import rwp from 'replicate-webhook-proxy'

import { EventBus } from '@/services'

class WS {
  constructor() {
    this.client = null
  }

  init(key) {
    this.client = rwp(key)

    // Setup event listeners
    this.client.on('open', () => console.log('ws: open'))
    this.client.on('close', () => console.log('ws: close'))
    this.client.on('message', (event) => this.onmessage(event))
    this.client.on('error', (event) => console.log('ws: error', event.message))
  }

  deinit() {
    this.client.close()
    this.client = null
  }

  onmessage(event) {
    const { body } = event.data
    const type = `image:${body.status}`
    console.log('ws: message', type)

    if (type === 'image:succeeded') {
      body.output.forEach((_, i) => {
        EventBus.$emit(type, {
          num_output: i,
          prediction: body
        })
      })
    } else {
      EventBus.$emit(type, {
        num_output: null, // body.output ? body.output?.length : 0,
        prediction: body
      })
    }
  }
}

export default new WS()
