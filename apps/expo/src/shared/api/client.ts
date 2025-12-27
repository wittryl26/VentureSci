import env from '../config/env';

type HttpMethod = 'GET' | 'POST';

interface RequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
}

interface ApiResponse<T> {
  data: T;
}

export async function requestApi<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const url = `${env.apiBaseUrl}${path}`;
  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const payload: ApiResponse<TResponse> = await response.json();
  return payload.data;
}
