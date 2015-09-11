module Api
  module V1
    module Me
      class ActivityTrackerResponsesController < Api::V1::Me::BaseController
        def edit; end

        def create
          if user_activity_period.blank?
            # TODO: research angular i18n to determine if we should use it's
            # version or rails's
            return render json:
              { errors: 'The date information was not saved. Try again.' },
                          status: :unprocessable_entity
          end
          new_activity_tracker_responses = nil

          ActiveRecord::Base.transaction do
            new_activity_tracker_responses =
              ActivityTrackerResponse.create(tracker_responses_attrs)
          end

          if new_activity_tracker_responses.all?(&:persisted?)
            render json: new_activity_tracker_responses
          else
            render json:
              { errors: 'The activity result was not saved. Try again.' },
                   status: :unprocessable_entity
          end
        end

        private

        def user_activity_period
          UserActivityPeriod.find_by(
            'user_activity_id = :id AND created_at > :time',
            id: response_params[:user_activity_id],
            time: Time.zone.now - 10.minute
          )
        end

        def tracker_responses_attrs
          response_params[:questions].map do |k, v|
            {
              activity_tracker_question_id: k,
              response: v[:response],
              user_activity_period_id: user_activity_period.id
            }
          end
        end

        def response_params
          params.require(:activity_tracker_response)
            .permit(
              :user_activity_id,
              questions: [
                :id,
                :response
              ]
            )
        end
      end
    end
  end
end
