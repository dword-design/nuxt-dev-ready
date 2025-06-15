import axios from 'axios';
import pWaitFor from 'p-wait-for';
import portReady from 'port-ready';

export default async (port = 3000) => {
  await portReady(port);

  await pWaitFor(
    async () => {
      try {
        const { data } = await axios.get(`http://localhost:${port}`);
        return !data.includes('id="nuxt_loading_screen"');
      } catch (error) {
        return error.response !== undefined && error.response.status !== 503;
      }
    },
    { interval: 100 },
  );
};
