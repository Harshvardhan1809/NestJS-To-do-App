export const config = {
    headers : {
        "Content-Type" : "application/json",
    },
    withCredentials : true, 
}

// "Access-Control-Allow-Credentials"

// To debug the CORS error, not much is needed from the client side
// The server and the browser should allow the request

// if the "Access-Control-Allow-Origin": "*" setting is used
// Access to XMLHttpRequest at 'http://localhost:9010/auth/login' from origin 'http://127.0.0.1:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.