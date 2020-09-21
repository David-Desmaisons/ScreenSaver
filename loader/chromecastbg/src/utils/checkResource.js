const got = require('got');

const userAgent = process.env.userAgent;
const timeOutRetrial = parseInt(process.env.timeOutRetrial);

function isSuccess(statusCode){
  return statusCode>= 200 && statusCode<300;
}

async function checkResource(url, contentType){
  try {
		const response = await got(url, {
      method: "HEAD",
      throwHttpErrors: false,
      retry: {
        calculateDelay: ({attemptCount}) => (attemptCount!==1) ? 0 : timeOutRetrial
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
