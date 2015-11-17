module Api
  module V1
    module Mbs
      class AssessmentsCallbackController < ApplicationController
        skip_before_action :verify_authenticity_token
        before_filter :authenticate_user!

        # MBS provides a series of assessments that occur in a specific order
        # with a given id. MBS sends us the id of the assessment that the user
        # just finished ( params[:completedtestid]).
        # Based on that id, we look up the slug for the next assessment.

        PROCESSING_SPEED_ID = 74
        RECALL_MEMORY_ID = 75
        SUSTAINED_ATTENTION_ID = 79
        WORKING_MEMORY_ID = 27
        COGNITIVE_FLEXIBILITY_ID = 57
        EXECUTIVE_FUNCTION_ID = 66
        RECALL_MEMORY_DELAYED_ID = 76

        ASSESSMENTS = {
          :calibration => {
            next_assessment_id: PROCESSING_SPEED_ID,
            slug: 'processing-speed'
          },
          PROCESSING_SPEED_ID => {
            next_assessment_id: RECALL_MEMORY_ID,
            slug: 'recall-memory'
          },
          RECALL_MEMORY_ID => {
            next_assessment_id: SUSTAINED_ATTENTION_ID,
            slug: 'sustained-attention'
          },
          SUSTAINED_ATTENTION_ID => {
            next_assessment_id: WORKING_MEMORY_ID,
            slug: 'working-memory'
          },
          WORKING_MEMORY_ID => {
            next_assessment_id: COGNITIVE_FLEXIBILITY_ID,
            slug: 'cognitive-flexibility'
          },
          COGNITIVE_FLEXIBILITY_ID => {
            next_assessment_id: EXECUTIVE_FUNCTION_ID,
            slug: 'executive-function'
          },
          EXECUTIVE_FUNCTION_ID => {
            next_assessment_id: RECALL_MEMORY_DELAYED_ID,
            slug: 'recall-memory-delayed'
          },
          RECALL_MEMORY_DELAYED_ID => { next_assessment_id: nil }
        }

        def create
          redirect_to assessment_url
        end

        private

        def next_assessment_slug(completed_id)
          if completed_id.present?
            ASSESSMENTS[completed_id.to_i].try(:[], :slug)
          # calibration returns completedtestid=NULL
          else
            ASSESSMENTS[:calibration][:slug]
          end
        end

        def last_assessment_id
          @last_assessment_id ||=
            ASSESSMENTS.find { |_k, v| v[:next_assessment_id].nil? }[0]
        end

        def assessment_url
          @assessment_url ||= begin
            completed_id = params[:completedtestid]
            slug = next_assessment_slug(completed_id)

            if completed_id.to_i == last_assessment_id
              Frontend::Paths.lookup(:assessments_results)
            elsif slug.present?
              # TODO: figure out if the frontend needs completed_id in the url
              Frontend::Paths.lookup(:assessments, slug, completed_id)
            else
              # TODO: do we need to handle invalid ids from MBS?
              Frontend::Paths.lookup(:assessments, nil, nil)
            end
          end
        end
      end
    end
  end
end
