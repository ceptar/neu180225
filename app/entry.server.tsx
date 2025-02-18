import type { EntryContext } from '@remix-run/server-runtime';
import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';
import ReactDOM from 'react-dom/server';
import {
  IS_CF_PAGES,
  safeRequireNodeDependency,
} from '~/app/utils/platform-adapter';

const ABORT_DELAY = 5000;

type PlatformRequestHandler = (
  arg0: Request,
  arg1: number,
  arg2: Headers,
  arg3: EntryContext,
  arg4: JSX.Element,
) => Response | Promise<Response>;

async function handleCfRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  jsx: JSX.Element,
) {
  const body = await ReactDOM.renderToReadableStream(jsx, {
    signal: request.signal,
    onError(error: unknown) {
      // Log streaming rendering errors from inside the shell
      console.error(error);
      responseStatusCode = 500;
    },
  });

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

async function handleNodeRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  jsx: JSX.Element,
): Promise<Response> {
  let callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady';

  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = ReactDOM.renderToPipeableStream(jsx, {
      [callbackName]: async () => {
        const { PassThrough } = await safeRequireNodeDependency('node:stream');

        const { createReadableStreamFromReadable } =
          await safeRequireNodeDependency('@remix-run/node');

        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);
        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(stream, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode,
          }),
        );
        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        didError = true;

        console.error(error);
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {

  const jsx = (

      <RemixServer context={remixContext} url={request.url} />

  );

  const requestHandler: PlatformRequestHandler = IS_CF_PAGES
    ? handleCfRequest
    : handleNodeRequest;

  return requestHandler(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    jsx,
  );
}