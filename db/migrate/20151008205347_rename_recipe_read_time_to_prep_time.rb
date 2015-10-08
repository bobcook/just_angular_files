class RenameRecipeReadTimeToPrepTime < ActiveRecord::Migration
  def change
    rename_column :recipes, :read_time, :prep_time
  end
end
