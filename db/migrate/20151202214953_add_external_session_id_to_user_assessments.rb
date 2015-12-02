class AddExternalSessionIdToUserAssessments < ActiveRecord::Migration
  def change
    add_column :user_assessments, :external_session_id, :string
  end
end
