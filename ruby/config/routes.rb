Rails.application.routes.draw do
  namespace :app, path: "" do
    namespace :integrations do
      namespace :agendrix do
        get "my-profile", to: "my_user#index"
        get "my-organization-positions", to: "my_organization_positions#index"

        get "oauth/redirect", to: "oauth#redirect"
      end
    end

    root "home#index"
  end
end
