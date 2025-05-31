import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta() {
  return [{
    title: "AI Video Analyzer"
  }, {
    name: "description",
    content: "วิเคราะห์วิดีโอตรงประเด็นด้วย AI"
  }];
}
const home = withComponentProps(function Home() {
  const [file, setFile] = useState(null);
  const [expectedTopic, setExpectedTopic] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    var _a, _b;
    e.preventDefault();
    if (!file || !expectedTopic) return;
    const formData = new FormData();
    formData.append("video", file);
    formData.append("expected_topic", expectedTopic);
    const apiUrl = "https://video-analyzer-api.onrender.com";
    const response = await fetch(`${apiUrl}/analyze`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      navigate("/result", {
        state: {
          error: "เกิดข้อผิดพลาดในการวิเคราะห์"
        }
      });
      return;
    }
    const data = await response.json();
    navigate("/result", {
      state: {
        score: (_a = data.result) == null ? void 0 : _a.score,
        suggestion: (_b = data.result) == null ? void 0 : _b.suggestion
      }
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "bg-blue-900/90 rounded-xl shadow-2xl p-8 w-full max-w-md border border-blue-800",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-center mb-7",
        children: [/* @__PURE__ */ jsx("div", {
          className: "bg-blue-800 rounded-full p-4 mb-2 shadow-md",
          children: /* @__PURE__ */ jsx("svg", {
            className: "w-10 h-10 text-blue-300",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
            })
          })
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-blue-200",
          children: "AI Video Analyzer"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-blue-300 text-sm mt-1",
          children: "วิเคราะห์วิดีโอตรงประเด็นด้วย AI"
        })]
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "video-upload",
            className: "block text-blue-200 font-medium mb-1",
            children: "อัปโหลดวิดีโอ"
          }), /* @__PURE__ */ jsx("input", {
            id: "video-upload",
            type: "file",
            accept: "video/*",
            onChange: (e) => {
              var _a;
              return setFile(((_a = e.target.files) == null ? void 0 : _a[0]) || null);
            },
            required: true,
            className: "block w-full text-sm text-blue-100 border border-blue-700 rounded-lg cursor-pointer bg-blue-950 focus:ring-2 focus:ring-blue-500 focus:outline-none file:bg-blue-900 file:border-0 file:text-blue-200 file:mr-3"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "expected-topic",
            className: "block text-blue-200 font-medium mb-1",
            children: "หัวข้อที่คาดหวัง"
          }), /* @__PURE__ */ jsx("input", {
            id: "expected-topic",
            type: "text",
            placeholder: "หัวข้อที่คาดหวัง",
            value: expectedTopic,
            onChange: (e) => setExpectedTopic(e.target.value),
            required: true,
            className: "w-full px-3 py-2 border border-blue-700 rounded-lg bg-blue-950 text-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          className: "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400",
          children: "วิเคราะห์วิดีโอ"
        })]
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dcm-1aLq.js", "imports": ["/assets/chunk-D4RADZKF-C3YXcCDU.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CuEGX0Mt.js", "imports": ["/assets/chunk-D4RADZKF-C3YXcCDU.js", "/assets/with-props-e8t6MI-u.js"], "css": ["/assets/root-BTy66TIm.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-f2Q7KqlJ.js", "imports": ["/assets/with-props-e8t6MI-u.js", "/assets/chunk-D4RADZKF-C3YXcCDU.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-348c5727.js", "version": "348c5727", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
import { createRequestHandler } from "@react-router/serve";
import * as build from "../build/server/index.js";

export default createRequestHandler({ build });
