class AddDisplayNameToPillars < ActiveRecord::Migration
  def up
    add_column :pillars, :display_name, :string

    mapper = ImportContent::PillarMapping

    Pillar.find_each do |pillar|
      pillar.update(display_name: mapper.new_name(pillar.name))
    end
  end

  def down
    remove_column :pillars, :display_name
  end
end
