const ROOT_URL = "/api/";

interface ApiError {
  statusCode: number;
  error: {
    errorCode: string;
    message: unknown;
    logId: null;
  };
}

interface RequestConfig {
  emptyBody?: boolean;
  nonJson?: boolean;
  pathComplete?: boolean;
}

const networkError = (err: unknown): Promise<never> => {
  return Promise.reject({
    statusCode: -1,
    error: {
      errorCode: "NETWORK_ERROR",
      message: err,
      logId: null,
    },
  });
};

export const handleResponse =
  (config?: RequestConfig) => (response: Response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => {
          if (response.status === 404) {
            const error: ApiError = {
              statusCode: response.status,
              error: {
                errorCode: "NOT_FOUND",
                message: "Resource not found",
                logId: null,
              },
            };

            throw error;
          }

          // We should never get these unless response is mangled
          // Or API is not properly implemented
          const error: ApiError = {
            statusCode: response.status,
            error: {
              errorCode: "UNKNOWN_INTERNAL_PROBLEM",
              message: "Invalid or missing JSON",
              logId: null,
            },
          };

          throw error;
        })
        .then((errorJson: unknown) => {
          const error = { statusCode: response.status, error: errorJson };
          throw error;
        });
    }

    if (response.status === 204) {
      return {};
    }

    if (config) {
      if (config.emptyBody) {
        return {};
      }
      if (config.nonJson) {
        return response;
      }
    }

    return response.json();
  };

export const buildUrlFromParams = (
  path: string,
  parameters?: Record<string, string | null>,
) => {
  const parameterList: string[] = [];
  if (parameters) {
    Object.keys(parameters).forEach((key) => {
      const value = parameters[key];

      if (value) {
        parameterList.push(`${key}=${value}`);
      }
    });
  }

  let urlParameters = parameterList.join("&");

  if (urlParameters) {
    urlParameters = "?" + urlParameters;
  }

  return path + urlParameters;
};

const internalRequest = (
  path: string,
  fetchConfig: RequestInit,
  config: RequestConfig = {},
) => {
  const url = config.pathComplete ? `${path}` : `${ROOT_URL}${path}`;

  return fetch(url, fetchConfig)
    .catch(networkError)
    .then(handleResponse(config));
};

const getJsonConfig = (method: string, body: unknown): RequestInit => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
  body: JSON.stringify(body),
});

export const makeServerRequest = (path: string, config?: RequestConfig) => {
  return internalRequest(path, { credentials: "same-origin" }, config);
};

export const makeServerPost = (
  path: string,
  body: unknown,
  config: RequestConfig = {},
) => {
  const fetchConfig = getJsonConfig("POST", body);

  return internalRequest(path, fetchConfig, config);
};

export const makeServerPut = (
  path: string,
  body: unknown,
  config: RequestConfig = {},
) => {
  const fetchConfig = getJsonConfig("PUT", body);

  return internalRequest(path, fetchConfig, config);
};

export const makeServerDelete = (
  path: string,
  body: unknown,
  config: RequestConfig = {},
) => {
  const fetchConfig = getJsonConfig("DELETE", body);

  return internalRequest(path, fetchConfig, config);
};
