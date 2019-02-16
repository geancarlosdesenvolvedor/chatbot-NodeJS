const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1'); // watson 
require('dotenv').config()

const ASSISTANT_IAM_URL = process.env.ASSISTANT_IAM_URL;
const ASSISTANT_IAM_APIKEY = process.env.ASSISTANT_IAM_APIKEY;

const chatbot = new watson({
  'version': process.env.VERSION,
  'url': ASSISTANT_IAM_URL || '<url>',
  'iam_apikey': ASSISTANT_IAM_APIKEY || '<iam_apikey>',
  'iam_url': process.env.IAM_URL
});

const workspace_id = process.env.WORKSPACE_ID;

var payload = {
  workspace_id: workspace_id,
  context: {},
  input: {}
};

chatbot.message(payload, trataResposta);

  function trataResposta(err, resposta){
  if (err) {
    console.log(err);
    return;
  }
  // exibe a resposta do dialogo,caso exista
  if (resposta.intents.length > 0) {
    console.log('Detectado resposta Bot >> ' + resposta.intents[0].intent);
  }

  if (resposta.output.text.length > 0) {
    console.log(resposta.output.text[0]);
  }

  const mensagemUser = prompt('>>');

  chatbot.message({
    workspace_id : workspace_id,
    context : resposta.context,
    input : {text: mensagemUser}
  }, trataResposta);
  }
