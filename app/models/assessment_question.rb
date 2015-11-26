class AssessmentQuestion < ActiveRecord::Base
  has_many :assessment_responses
  has_many :question_recommendations, dependent: :destroy

  has_many :recommended_recipes,
           through: :question_recommendations,
           source: :recommendable,
           source_type: 'Recipe'

  has_many :recommended_articles,
           through: :question_recommendations,
           source: :recommendable,
           source_type: 'Article'

  has_many :recommended_games,
           through: :question_recommendations,
           source: :recommendable,
           source_type: 'Game'

  has_many :recommended_activities,
           through: :question_recommendations,
           source: :recommendable,
           source_type: 'Activity'

  belongs_to :assessment
end
