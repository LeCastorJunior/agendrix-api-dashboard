// This file only serves the purpose of the example
// In a real application, those informations as environnement variables
// Since they do not need to stay secret, it would be alright to send them client side in a way or another

const agendrixAPI = "https://api.agendrix.com/v1";
const oauthProvider = "https://app.agendrix.com/oauth";
const serverAPI = "http://localhost:4000/api";
const redirectURI = "https://localhost:3000/home";

export { agendrixAPI, oauthProvider, serverAPI, redirectURI };
