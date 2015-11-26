class CreateQuestionRecommendations < ActiveRecord::Migration
  def change
    create_table :question_recommendations do |t|
      t.string :external_id, null: false
      t.belongs_to :assessment_question, index: true
      t.belongs_to :recommendable, polymorphic: true
      t.timestamps
    end

    add_index(
      :question_recommendations,
      [:recommendable_type, :recommendable_id],
      name: 'by_recommendable'
    )

    change_table :assessment_questions do |t|
      t.remove :recommendation_id
      t.string :external_recommendation_id
      t.belongs_to :question_recommendations, index: true
    end
  end
end
