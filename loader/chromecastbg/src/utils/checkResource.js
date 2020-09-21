const got = require('got');

const userAgent = process.env.userAgent;

function isSuccess(statusCode){
  return statusCode>= 200 && statusCode<300;
}

async function checkResource(url, contentType){
  try {
		const response = await got(url, {
      method: "HEAD",
      throwHttpErrors: false,
      retry: {
        limit: 2,
        calculateDelay: ({attemptCount}) =>{
          return (attemptCount===1) ? 750 : 0;
        } 
      },
      header:{
        "user-agent": userAgent,
        "content-type": contentType
      }
    });
    return isSuccess(response.statusCode);
	} catch (error) {
    return false;
	}
}

module.exports = {
  checkResource
}
