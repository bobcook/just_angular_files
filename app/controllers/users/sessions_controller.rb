module Users
  class SessionsController < Devise::SessionsController
    def destroy
      user = current_user
      super do
        Apis::DSO.endpoints.logout(user.auth_token) # consider backgrounding
      end
    end
  end
end
