module Api
  module V1
    module Me
      module Activities
        class TrackersController < Api::V1::Me::BaseController
          def index
            activity_tracker =
              Activity
              .includes(activity_tracker: :activity_tracker_questions)
              .find(params[:activity_id])

            # TODO: figure out how to make work with respond_with
            render json: activity_tracker
          end
        end
      end
    end
  end
end
