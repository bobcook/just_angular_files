class CreatePillarCategorizations < ActiveRecord::Migration
  def change
    create_table :pillar_categorizations do |t|
      t.belongs_to :pillar
      t.references :categorizable, polymorphic: true

      t.timestamps
    end

    add_index :pillar_categorizations, :pillar_id
    add_index :pillar_categorizations, :categorizable_id
  end
end
