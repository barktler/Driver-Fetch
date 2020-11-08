/**
 * @author WMXPY
 * @namespace Fetch
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, PendingRequest, RequestDriver } from "@barktler/driver";

export type AxiosDriverOptions = {
};

export const generateFetchRequest = <Body>(request: IRequestConfig<Body>, abortController: AbortController): RequestInit => {

    return {

        mode: 'cors',
        method: request.method,

        signal: abortController.signal,

        headers: request.headers,
        body: request.body
            ? JSON.stringify(request.body)
            : undefined,
    };
};

export const parseFetchResponse = async <Data>(response: Response): Promise<IResponseConfig<Data>> => {

    const data: Data = await response.json();

    return {

        data,
        status: response.status,
        statusText: response.statusText,

        headers: response.headers as any,
    };
};

export const createFetchDriver = (options: Partial<AxiosDriverOptions>): RequestDriver => {

    const fetchDriver: RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): PendingRequest<Body, Data> => {

        const abortController: AbortController = new AbortController();
        const requestInit: RequestInit = generateFetchRequest<Body>(request, abortController);

        const pending: PendingRequest<Body, Data> = PendingRequest.create({

            response: (async (): Promise<IResponseConfig<Data>> => {

                const rawResponse: Response = await fetch(request.url, requestInit);
                const response: IResponseConfig<Data> = await parseFetchResponse<Data>(rawResponse);
                return response;
            })(),
            abort: () => {
                abortController.abort();
            },
        });
        return pending;
    };

    return fetchDriver;
};
