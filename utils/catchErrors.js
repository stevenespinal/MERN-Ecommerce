function catchErrors(error, displayError) {
  let errorMsg;
  const {response, request} = error;
  if (response) {
    //req was made and server responded with a status code that is not 2XX range
    errorMsg = response.data;
    console.error("Error response", errorMsg);

  //  For cloudinary image upload error
    if (response.data.error) {
      errorMsg = response.data.error.message;
    }
  } else if (request) {
  //  req was made but no response was returned
    errorMsg = request;
    console.error("Error Request", errorMsg);
  } else {
  //  something else went wrong
    errorMsg = message;
    console.error("Error", errorMsg);
  }

  displayError(errorMsg);


}

export default catchErrors;