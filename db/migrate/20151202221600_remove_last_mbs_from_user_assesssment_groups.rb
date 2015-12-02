class RemoveLastMbsFromUserAssesssmentGroups < ActiveRecord::Migration
  def change
    remove_column :user_assessment_groups, :last_mbs, :integer
  end
end
