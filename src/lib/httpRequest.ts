import * as superagent_request from 'superagent';

// time delay between requests
var retryDelay = 3000;

// retry recount
const maxAttempts = 5;

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// retry request if error or 429 received
var retryStrategy = (err, response) => {
  delay(retryDelay).then(() => {
    let shouldRetry = err || response.statusCode === 429;
    return shouldRetry;
  });

};
export const request = async (options: any): Promise<any> => {

  if(options.retryDelay){
    retryDelay = options.retryDelay;
  }
  
  if (options.method.toUpperCase()==="GET"){
    const results = await superagent_request.get(options.url)
      .retry(maxAttempts, retryStrategy)
      .accept('application/json')
      .set('Ocp-Apim-Subscription-Key', options.headers['Ocp-Apim-Subscription-Key']);

      if (results && results.body) return results.body;
  } else {
    return Promise.reject("can't determine method");
  }

}