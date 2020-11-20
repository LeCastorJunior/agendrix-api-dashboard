module App
  module Integrations
    module Agendrix
      class MyUserController < BaseController
        def index
          data, error = exec({ method: :get, url: "/v1/users/me" })
          @user = data || { "email": "", "profile": { "first_name": "", "last_name": "" }}

          flash.now.notice = error if error.present?
          render "app/my_agendrix_user"
        end
      end
    end
  end
end
