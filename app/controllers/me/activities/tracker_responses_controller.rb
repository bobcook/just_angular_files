module Me
  module Activities
    class TrackerResponsesController < Me::BaseController
      def index; end

      def new
        # TODO: make this a before_action in Me::BaseController
        set_angular_csrf_cookie if protect_against_forgery?

        activity_tracker
        @activity_tracker_response = ActivityTrackerResponse.new
      end

      private

      def activity
        @activity ||= Activity.find(params[:activity_id])
      end

      def activity_tracker
        @activity_tracker ||= activity.activity_tracker
      end
    end
  end
end
