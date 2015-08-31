module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def aarp
      @user = User.from_omniauth(request.env['omniauth.auth'])

      # TODO: add real redirect paths
      if @user.persisted?
        sign_in_and_redirect @user, event: :authentication
      else
        session['devise.example_data'] = request.env['omniauth.auth']
        redirect_to home_path
      end
    end
  end
end
