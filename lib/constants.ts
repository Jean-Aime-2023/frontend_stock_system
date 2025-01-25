export const prod = process.env.NODE_ENV === "production";
export const apiUrl = !prod ? "http://localhost:4000/api/v1" : "https://api.sms.com/api/v1";
export const publicRoutes = ['/login', '/register', 'reset-password'];