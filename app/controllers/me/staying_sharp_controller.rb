# The individual user's "dashboard"
module Me
  class StayingSharpController < Me::BaseController
    def show
      @user_activities = UserActivity.where(user: current_user)
    end
  end
end
