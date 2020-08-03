/**
 * @author WMXPY
 * @namespace Fetch
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, RequestDriver } from "@barktler/driver";

export const generateFetchRequest = <Body>(request: IRequestConfig<Body>): RequestInfo => {

    return {

        url: request.url,

        mode: 'cors',
        method: request.method,

        headers: request.headers as any,
        body: request.body as any,
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

export const fetchDriver: RequestDriver = async <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): Promise<IResponseConfig<Data>> => {

    const requestConfig: RequestInfo = generateFetchRequest<Body>(request);

    const rawResponse: Response = await fetch(requestConfig);

    const response: IResponseConfig<Data> = await parseFetchResponse<Data>(rawResponse);
    return response;
};
