class AddLastMbsToUserAssessmentGroup < ActiveRecord::Migration
  def change
    add_column :user_assessment_groups, :last_mbs, :integer
  end
end
