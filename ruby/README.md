## [Agendrix](https://www.agendrix.com/)'s public API Ruby on Rails integration example

This project is an example of how to integrate with Agendrix's public API, from the OAuth authentication to making calls to the API itself. The example is built with [Ruby on Rails](https://rubyonrails.org/).

This application is a good example of:

 - how to interact with Agendrix's OAuth provider.
 - how to securely store your tokens received from the OAuth provider.
 - how to make calls to Agendrix's API.
 - the refresh flow implementation, mandatory when using Agendrix's API (the access tokens have a TTL of **2 hours**).

This application is **NOT**:

 - An example of the best programming practices for a web app. The goal here is really to give a good idea of what you need in order to integrate with the API, not what a web app should be like.
 - A project meant to be copied in a production environment.

### Play with the example
 
If you want to run the application yourself, follow these steps:

1. Go to the [Developer Portal](https://developers.agendrix.com) to retrieve your application credentials.
1. Make sure that either you are retrieving credentials from an approved application, or retrieving the sandox environment credentials.
1. In [credentials.rb](./lib/credentials.rb), change the constants `client_id` and `client_secret` for your application credentials.
1. In the [Developer Portal](https://developers.agendrix.com) interface, add the app redirect url - https://localhost:3000/integrations/agendrix/oauth/redirect - to your credentials redirect uris. 
1. Make sure you have everything setup to run a Ruby on Rails [app](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm)
1. Start the app:

    ````bash
    bundle install
    rails s -b 'ssl://localhost:3000?key=config/ssl/localhost.key&cert=config/ssl/localhost.crt'
    ````

Open https://localhost:3000/, and enjoy!
 
