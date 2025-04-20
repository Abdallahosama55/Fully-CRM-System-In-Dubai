const express = require('express');
const path = require('path');
const compression = require('compression');
const fs = require('fs').promises; // Use async file reading
const axios = require('axios');
const app = express();
const port = process.env.PORT || 9760;

app.use(compression());
app.use(express.static(path.join(__dirname, 'client/build'), { index: false })); 
//app.use(express.static(path.join(__dirname, 'client/build')));

// Read index.html once at startup (acts as a template)
const indexPath = path.join(__dirname, 'client/build', 'index.html');
let indexHtmlTemplate = '';

async function getCompanyInfo(domain,requestedServer) {
  try {
    var serverUrl = "";
    switch(requestedServer){
      case 'vindo-test':
        serverUrl = 'https://crm-api-test.vindo.ai/api/v6/company/vindo/unauth/get-company-info';
      break;
      case 'vindo-prod':
        serverUrl = 'https://crm-api.vindo.ai/api/v6/company/vindo/unauth/get-company-info';
      break;
      case 'vbooking-prod':
        serverUrl = 'https://api.vbooking.ai/api/v6/company/vindo/unauth/get-company-info';
      break;
      case 'vbooking-test':
        serverUrl = 'https://api-test.vbooking.ai/api/v6/company/vindo/unauth/get-company-info';
      break;
      case 'vibein.prod':
        serverUrl = 'https://api.vibein.io/api/v6/company/vindo/unauth/get-company-info';
      break;
    }
      const response = await axios.get(serverUrl, {
          headers: {
              'Accept': 'application/json',
              'Referer': `https://${domain}/`,
              'Origin': `https://${domain}`
          }
      });
      
      console.log('response data',response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching company info:', error);
  }
}

async function loadIndexTemplate() {
  try {
    indexHtmlTemplate = await fs.readFile(indexPath, 'utf-8');
  } catch (error) {
    console.error('Error loading index.html:', error);
  }
}

// Load the template when the server starts
loadIndexTemplate();

// Function to replace metadata dynamically
function replaceMetaData(html, metadata) {
  
  return html
    .replace(/<title>.*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${metadata.description}" />`)
    .replace(/<link rel="icon" href=".*?" \/>/, `<link rel="icon" href="${metadata.logo}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${metadata.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${metadata.image}" />`);
}

app.set('trust proxy', true); // Ensure Express trusts proxy headers

async function handleRequest(req, res) {
  if (!indexHtmlTemplate) {
    await loadIndexTemplate();
  }

  const requestedDomain = req.headers['x-forwarded-host']  // Get the domain from the request
  const requestedServer = req.headers['x-forwarded-server']  // Get the domain from the request
  const companyInfo = await getCompanyInfo(requestedDomain,requestedServer)
  console.log('Requested Server:', requestedServer);
  //console.log('companyInfo:', companyInfo);

  const metadata = {
    title: companyInfo?.data?.name || 'Dashboard',
    description: companyInfo?.data?.metaShortDescription || companyInfo?.data?.description || 'The ultimate experiences. Advanced tools, AI features, and exclusive inventory to streamline and deliver unforgettable experiences.',
    image: companyInfo?.data?.metaIcon || companyInfo?.data?.image || '',
    logo: companyInfo?.data?.metaIcon || companyInfo?.data?.image || '',
  };

  const modifiedHtml = replaceMetaData(indexHtmlTemplate, metadata);
  //console.log(modifiedHtml)
  res.send(modifiedHtml);
}

app.get('/*', async (req, res) => {
  console.log('Wildcard URL Requested');
  await handleRequest(req, res);
});
app.get('/', async (req, res) => {
  console.log('Root URL Requested');
  await handleRequest(req, res);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
