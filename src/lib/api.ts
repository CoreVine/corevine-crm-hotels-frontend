export const responseCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  serverError: 500
};

export function loadDefaultHeaders(token?: string, rest?: any): any {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...rest
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}
