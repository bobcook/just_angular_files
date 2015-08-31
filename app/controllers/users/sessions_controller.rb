module Users
  class SessionsController < Devise::SessionsController
    def destroy
      user = current_user
      super do
        # TODO: error handling + consider backgrounding this?
        Apis::DSO.endpoints.logout(user.auth_token)
      end
    end
  end
end
