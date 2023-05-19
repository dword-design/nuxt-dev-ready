import axios from 'axios'
import pWaitFor from 'p-wait-for'
import portReady from 'port-ready'

export default async (port = 3000) => {
  await portReady(port)
  await pWaitFor(
    async () => {
      try {
        await axios.get(`http://localhost:${port}`)
      } catch (error) {
        return error.code !== 'ECONNREFUSED' && error.response.status !== 503
      }

      return true
    },
    { interval: 100 },
  )
}
