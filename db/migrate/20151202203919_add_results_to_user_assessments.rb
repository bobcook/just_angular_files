class AddResultsToUserAssessments < ActiveRecord::Migration
  def change
    add_column :user_assessments, :raw_results, :json
  end
end
