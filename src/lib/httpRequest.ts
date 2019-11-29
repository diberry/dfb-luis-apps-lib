const requestRetry = require('requestretry');

// time delay between requests
const retryDelay = 1000;

// retry recount
const maxAttempts = 5;

// retry request if error or 429 received
var retryStrategy = (err, response, body) => {
  let shouldRetry = err || response.statusCode === 429;
  if (shouldRetry) {
    console.log('retry');
    if (body) {
      console.log(body);
    }
  }
  return shouldRetry;
};
export async function request(options: any): Promise<any> {
  const httpOptions = {
    ...options,
    maxAttempts,
    retryDelay,
    retryStrategy,
  };

  const results =  await requestRetry(httpOptions);

  if (results && results.body) return results.body;
}
