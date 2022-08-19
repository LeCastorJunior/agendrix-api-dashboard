# Access the API without a UI

## introduction

If you wish to use our API with only a backend or a script, this guide will help you with the process of connecting you to the API. If you have
a UI available, you can look at our [Javascript](https://github.com/agendrix/public-api-integration-examples/tree/main/js) and [Ruby](https://github.com/agendrix/public-api-integration-examples/tree/main/ruby) exemple.
You will find below the only 2 ways to access our API without UI.


## Using the Playground

The first way is to use our [Playground](https://developers.agendrix.com/playground) to generate an **Access token** and **Refresh token**. From there you
can use your script or a backend to refresh the access token. An exemple on how to refresh a access token exist in the documentation [here](https://developers.agendrix.com/documentation#section/OAuth-2.0/Exchange-the-Refresh-Token-for-a-New-Access-Token).

## Using a redirect URI

Another way to use our API without a UI is to use a redirect uri. Here is a bash exemple for this use case : 
```bash
CLIENT_ID='YOUR_CLIENT_ID_HERE'
CLIENT_SECRET='YOUR_CLIENT_SECRET_HERE'

open "https://app.agendrix.com/oauth/authorize?client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=read+write"

echo "Authorization code :"
read CODE

curl \
--request POST 'https://app.agendrix.com/oauth/token' \
--header 'Content-Type: application/json' \
--data-raw "{
  \"client_id\": \"$CLIENT_ID\",
  \"client_secret\": \"$CLIENT_SECRET\",
  \"redirect_uri\": \"urn:ietf:wg:oauth:2.0:oob\",
  \"grant_type\": \"authorization_code\",
  \"code\": \"$CODE\"
}"
```

Then, the browser will open, you can copy and paste the codes in a terminal. The last request returns a JSON with an access_token and a refresh_token.
