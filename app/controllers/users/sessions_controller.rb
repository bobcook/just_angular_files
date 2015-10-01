module Users
  class SessionsController < Devise::SessionsController
    def destroy
      super do
        # consider backgrounding
        Apis::DSO.endpoints.logout current_user.auth_token
      end
    end
  end
end
