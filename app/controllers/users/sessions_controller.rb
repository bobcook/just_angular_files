module Users
  class SessionsController < Devise::SessionsController
    def destroy
      # current_user is nil in super's context
      user = current_user

      super do
        # consider backgrounding
        Apis::DSO.endpoints.logout user.auth_token
      end
    end
  end
end
