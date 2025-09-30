const errorMessages = {
  network: "No internet connection. Please check your network.",
  404: "Repository not found or not accessible. Please check the owner and repo name.",
  403: "Too many requests to GitHub. Please try again in about an hour.",
  422: "Something went wrong with the request. Please try again.",
  500: "GitHub is having issues. Please try again later.",
  502: "GitHub is having issues. Please try again later.",
  503: "GitHub is having issues. Please try again later.",
  504: "GitHub is having issues. Please try again later.",
  default: "Unknown error",
};

export function getErrorMessage(err) {
  switch (true) {
    case err.message?.includes("No internet") ||
      err.message?.includes("Failed to fetch"):
      return errorMessages.network;

    case [404, 403, 422].includes(err.status):
      return errorMessages[err.status];

    case err.status >= 500 && err.status <= 504:
      return errorMessages[500];

    default:
      return errorMessages.default;
  }
}
