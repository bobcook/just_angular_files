require 'rails_helper'

module Api
  module V1
    module Me
      describe RecommendedContentController do
        let(:user) { create(:user) }
        before { sign_in(user) }

        describe '#index' do
          context 'with user assesments' do
            let!(:user_assessment_group) do
              create(:user_assessment_group, user: user)
            end

            let!(:user_assessment) do
              create(
                :user_assessment,
                user_assessment_group: user_assessment_group,
                completed: true
              )
            end

            let!(:assessment_question) do
              create(
                :assessment_question,
                :with_recommendation,
                answer_values: [1, 2, 3, 4]
              )
            end

            let!(:assessment) { create(:assessment) }
            let!(:assessment_response) do
              create(
                :assessment_response,
                user_assessment: user_assessment,
                assessment_question: assessment_question,
                response: '4'
              )
            end

            before do
              assessment.assessment_questions << assessment_question
            end

            it 'returns recommendations json' do
              get :index, format: :json

              expect(JSON.parse(response.body)['recommended_content'])
                .to_not eq([])
            end
          end

          context 'without any user assessments' do
            it 'returns an empty array' do
              get :index, format: :json

              expect(JSON.parse(response.body)['recommended_content']).to eq([])
            end
          end
        end
      end
    end
  end
end
