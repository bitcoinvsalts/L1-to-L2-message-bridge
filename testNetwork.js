const https = require('https');
require('dotenv').config();

const { SEPOLIA_URL, OPTIMISM_SEPOLIA_URL } = process.env;

function checkURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    const sepoliaResponse = await checkURL(SEPOLIA_URL);
    console.log('Sepolia Response:', sepoliaResponse);

    const optimismResponse = await checkURL(OPTIMISM_SEPOLIA_URL);
    console.log('Optimism Sepolia Response:', optimismResponse);
  } catch (error) {
    console.error('Error connecting to networks:', error);
  }
}

main();
