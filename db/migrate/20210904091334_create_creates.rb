class CreateCreates < ActiveRecord::Migration[5.2]
  def change
    create_table :creates do |t|
      t.string :create_result
      t.integer :player_id

      t.timestamps
    end
  end
end
