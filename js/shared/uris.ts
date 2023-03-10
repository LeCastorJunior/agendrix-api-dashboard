// This file only serves the purpose of the example
// In a real application, those informations as environnement variables
// Since they do not need to stay secret, it would be alright to send them client side in a way or another

const agendrixAPI = "https://api.agendrix.com/v1";
const oauthProvider = "https://app.agendrix.com/oauth";
const serverAPI = "http://54.38.191.163:4000/api"; //server api
const redirectURI = "https://agendrix-api-dashboard-5nn7beozq-filoudenesque.vercel.app/home"; //redirect to app

export { agendrixAPI, oauthProvider, serverAPI, redirectURI };
