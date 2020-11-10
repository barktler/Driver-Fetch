/**
 * @author WMXPY
 * @namespace Fetch
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, PendingRequest, RequestDriver } from "@barktler/driver";

export type AxiosDriverOptions = {

    readonly bodyType: 'json' | 'form-data';
};

export const generateFetchRequest = <Body>(request: IRequestConfig<Body>, abortController: AbortController, options: AxiosDriverOptions): RequestInit => {

    let data: BodyInit | undefined;

    if (typeof request.body === 'undefined' || request.body === null) {

        data = undefined;
    } else if (options.bodyType === 'json') {

        data = JSON.stringify(request.body);
    } else if (options.bodyType === 'form-data') {

        const formData: FormData = new FormData();
        const keys: Array<keyof Body> = Object.keys(request.body) as Array<keyof Body>;

        for (const key of keys) {
            formData.append(key as string, request.body[key] as any);
        }
    }

    return {

        mode: 'cors',
        method: request.method,

        signal: abortController.signal,

        headers: request.headers,
        body: data,
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

export const createFetchDriver = (options: Partial<AxiosDriverOptions> = {}): RequestDriver => {

    const mergedOptions: AxiosDriverOptions = {

        bodyType: 'json',
        ...options,
    };

    const fetchDriver: RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): PendingRequest<Body, Data> => {

        const abortController: AbortController = new AbortController();
        const requestInit: RequestInit = generateFetchRequest<Body>(request, abortController, mergedOptions);

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
