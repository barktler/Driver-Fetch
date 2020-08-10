/**
 * @author WMXPY
 * @namespace Fetch
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, RequestDriver, PendingRequest } from "@barktler/driver";

export const generateFetchRequest = <Body>(request: IRequestConfig<Body>): RequestInit => {

    return {

        mode: 'cors',
        method: request.method,

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

export const fetchDriver: RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): PendingRequest<Body, Data> => {

    const requestInit: RequestInit = generateFetchRequest<Body>(request);

    const rawResponse: Response = await fetch(request.url, requestInit);

    const response: IResponseConfig<Data> = await parseFetchResponse<Data>(rawResponse);
    return response;
};
