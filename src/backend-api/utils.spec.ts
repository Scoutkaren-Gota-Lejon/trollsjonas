import * as utils from "./utils";
import fetchMock from "fetch-mock";

describe("api utils test", () => {
  beforeEach(() => {
    fetchMock.mockGlobal();
  });

  afterEach(() => {
    fetchMock.hardReset();
  });

  describe("buildUrlFromParams", () => {
    const path = "path";

    it("empty state", () => {
      const result = utils.buildUrlFromParams(path, {});
      expect(result).toEqual(path + "");
    });

    it("no parameters state", () => {
      const result = utils.buildUrlFromParams(path);
      expect(result).toEqual(path);
    });

    it("don't include empty parameter values", () => {
      const state = {
        page: "1",
        sort: "p",
        value: "",
        nullValue: null,
      };
      const result = utils.buildUrlFromParams(path, state);
      expect(result).toEqual(`${path}?page=1&sort=p`);
    });
  });

  describe("handleResponse", () => {
    describe("success", () => {
      const response = {
        ok: true,
        json: () => "json",
      } as unknown as Response;

      it("empty config", () => {
        const result = utils.handleResponse({})(response);
        expect(result).toEqual("json");
      });

      it("no config", () => {
        const result = utils.handleResponse()(response);
        expect(result).toEqual("json");
      });

      it("config, noBody", () => {
        const result = utils.handleResponse({ emptyBody: true })(response);
        expect(result).toEqual({});
      });
    });

    const methods = [
      {
        method: "makeServerRequest",
        fetch: "get" as const,
        args: (path: string, _body: unknown, config?: object) =>
          [path, config] as const,
      },
      {
        method: "makeServerPost",
        fetch: "post" as const,
        args: (path: string, body: unknown, config?: object) =>
          [path, body, config] as const,
      },
      {
        method: "makeServerPut",
        fetch: "put" as const,
        args: (path: string, body: unknown, config?: object) =>
          [path, body, config] as const,
      },
      {
        method: "makeServerDelete",
        fetch: "delete" as const,
        args: (path: string, body: unknown, config?: object) =>
          [path, body, config] as const,
      },
    ];

    methods.forEach((method) => {
      const matchPath = "path:/api/test";

      describe(method.method, () => {
        const callUtil = (config?: object) =>
          (utils as any)[method.method](...method.args("test", {}, config));

        it("success", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              body: { name: "test" },
              headers: { "content-type": "application/json" },
            },
            { repeat: 1 },
          );

          const response = await callUtil();
          expect(response.name).toEqual("test");
        });

        it("success noBody", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              headers: { "content-type": "application/json" },
            },
            { repeat: 1 },
          );

          const response = await callUtil({ emptyBody: true });
          expect(response).toEqual({});
        });

        it("error - network problems", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              throws: { message: "failed" },
            },
            { repeat: 1 },
          );

          await expect(callUtil()).rejects.toEqual({
            statusCode: -1,
            error: {
              errorCode: "NETWORK_ERROR",
              message: { message: "failed" },
              logId: null,
            },
          });
        });

        it("error - from server", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              body: { name: "failed" },
              status: 500,
              headers: { "content-type": "application/json" },
            },
            { repeat: 1 },
          );

          await expect(callUtil()).rejects.toMatchObject({
            error: { name: "failed" },
          });
        });

        it("error - from server noBody", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              status: 500,
              headers: { "content-type": "application/json" },
            },
            { repeat: 1 },
          );

          await expect(callUtil()).rejects.toMatchObject({
            error: {
              errorCode: "UNKNOWN_INTERNAL_PROBLEM",
              logId: null,
              message: "Invalid or missing JSON",
            },
          });
        });

        it("error - not found", async () => {
          fetchMock[method.fetch](
            matchPath,
            {
              status: 404,
              headers: { "content-type": "application/json" },
            },
            { repeat: 1 },
          );

          await expect(callUtil()).rejects.toMatchObject({
            error: {
              errorCode: "NOT_FOUND",
              logId: null,
              message: "Resource not found",
            },
          });
        });
      });
    });
  });
});
