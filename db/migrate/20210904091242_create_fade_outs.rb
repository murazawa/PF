class CreateFadeOuts < ActiveRecord::Migration[5.2]
  def change
    create_table :fade_outs do |t|
      t.string :fade_out_result
      t.integer :player_id

      t.timestamps
    end
  end
end
