// client/src/service/fetch.service.js

async function doRequest(url, config = {}) {
  try {
    const response = await fetch(url, {
      credentials: "include",
      ...config,
    });

    const contentType = response.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");
    const responseBody = isJson ? await response.json() : response.text();

    if (!response.ok) {
      const errorMessage =
        typeof responseBody === "string"
          ? responseBody
          : responseBody?.message || JSON.stringify(responseBody);

      throw new Error(`${errorMessage}`);
    }

    return responseBody;
  } catch (err) {
    const message = err?.message?.toLowerCase?.() || "";
    if (
      err instanceof TypeError ||
      message.includes("failed to fetch") ||
      message.includes("networkerror")
    ) {
      throw new Error("Server unreachable");
    }
    throw err;
  }
}

const FetchService = {
  doRequest,
};

export default FetchService;
