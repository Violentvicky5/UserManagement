
const apiFetch = async (url, options = {}) => {
  // Get access token from sessionStorage
  const accessToken = sessionStorage.getItem("accessToken");

  const defaultHeaders = {
    "Content-Type": "application/json", //Always sends JSON content type.
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }), //If an access token exists, adds Authorization header automatically:
  };
const URL = import.meta.env.VITE_BACKEND_API_URL
  // First API request
  let res = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    credentials: "include", // required for HTTP-only refresh token cookie
  });

  
  // If access token expired, refresh it
  if (res.status === 401) {
    const refreshRes = await fetch(`${URL}/api/auth/refresh-token`, {
      method: "GET",
      credentials: "include",
    });

    if (!refreshRes.ok) {
 sessionStorage.removeItem("accessToken");
  window.location.href = "/login";
  return;
    }

    const refreshData = await refreshRes.json();
    sessionStorage.setItem("accessToken", refreshData.accessToken);

    // Retry original request with new token
    const retryHeaders = {
       "Content-Type": "application/json",
      Authorization: `Bearer ${refreshData.accessToken}`,
      ...options.headers,
    };

    res = await fetch(url, { ...options, headers: retryHeaders, credentials: "include" });
  }

  return res;
};
export default apiFetch;