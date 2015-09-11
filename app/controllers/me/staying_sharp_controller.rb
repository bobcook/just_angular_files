# The individual user's "dashboard"
module Me
  class StayingSharpController < Me::BaseController
    def show
      set_angular_csrf_cookie if protect_against_forgery?

      @user_activities = UserActivity.where(user: current_user)
    end
  end
end
