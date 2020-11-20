module App
  module Integrations
    module Agendrix
      class MyOrganizationPositionsController < BaseController
        def index
          data, error = exec({ method: :get, url: "/v1/positions" })
          @positions = data || []

          flash.now.notice = error if error.present?
          render "app/my_agendrix_organization_positions"
        end
      end
    end
  end
end
