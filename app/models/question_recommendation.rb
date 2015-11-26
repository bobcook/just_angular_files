class QuestionRecommendation < ActiveRecord::Base
  belongs_to :assessment_question
  belongs_to :recommendable, polymorphic: true

  before_save :set_external_id

  private

  def set_external_id
    self.external_id ||= assessment_question.external_recommendation_id
  end
end
