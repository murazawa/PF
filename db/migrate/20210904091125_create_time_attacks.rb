class CreateTimeAttacks < ActiveRecord::Migration[5.2]
  def change
    create_table :time_attacks do |t|
      t.string :syllabary_result
      t.string :great_man_result
      t.string :standard_result
      t.integer :player_id

      t.timestamps
    end
  end
end
