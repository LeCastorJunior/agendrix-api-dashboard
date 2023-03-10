import React, { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { redirectURI, oauthProvider } from "../../shared/uris";
import { clientID, scopes } from "../../shared/credentials";
import ServerAPI from "../services/ServerAPI";
import "../css/main.css";

const authRequest = `${oauthProvider}/authorize?redirect_uri=${redirectURI}&client_id=${clientID}&scope=${scopes}&response_type=code`;
const buttonClassNames =
  "border border-gray-800 rounded text-gray-800 p-2 my-1 mx-auto focus:outline-none hover:border-black hover:text-black";

const Home: React.FC = () => {
  const {
    query: { code },
  }: GenericObject = useLocation();

  const exchangeCode = useCallback(async (): Promise<void> => {
    try {
      const response = await ServerAPI.post(
        "/integrations/agendrix/oauth/tokens",
        { code }
      );
      const result = await response.json();

      if (response.ok) alert("Success");
      else alert(`Could not exchange the token: ${result.error}`);
    } catch (e) {
      alert("Server error.");
    } finally {
      window.history.replaceState({}, document.title, "/home");
    }
  }, [code]);

  useEffect(() => {
    if (code) exchangeCode();
  }, [code, exchangeCode]);

  const handleAuthorizeRequest = async (): Promise<void> => {
    window.location.href = encodeURI(authRequest);
  };

  return (
    <div className="flex">
      <div className="m-auto">
        <h1 className="text-2xl text-center my-4 underline">
          Agendrix's Public API Integration Example - Express, React, TS
        </h1>
        <div className="flex flex-col">
          <h2 className="text-xl italic my-2">Authorization Request</h2>
          {/* <div className="block border border-gray-800 text-gray-800 rounded-md p-2 my-2 mx-auto">
            {authRequest}
          </div> */}
          <button className={buttonClassNames} onClick={handleAuthorizeRequest}>
            Send Request
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl italic my-2">Use the API</h2>
          <div className="flex justify-between">
            {/* <a
              className={buttonClassNames}
              href="/integrations/agendrix/my-profile"
            >
              See my Agendrix's profile
            </a>
            <a
              className={buttonClassNames}
              href="/integrations/agendrix/my-organization-positions"
            >
              See my linked organization's positions
            </a> */}
            <a
              className={buttonClassNames}
              href="/integrations/agendrix/my-team-members-ae"
            >
              Facturation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
