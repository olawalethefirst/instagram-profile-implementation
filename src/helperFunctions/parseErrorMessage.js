const parseErrorMessage = (error) => {
  switch (error) {
    case "OAuth error: The access token is invalid":
      return "Server Unavailable";
    case "Network request failed":
      return "No Internet Connection";
    default:
      return "An Error Occurred";
  }
};

export default parseErrorMessage;
