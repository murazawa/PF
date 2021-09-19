class CreateThemeWords < ActiveRecord::Migration[5.2]
  def change
    create_table :theme_words do |t|
      t.text :type_word
      t.text :read_word
      t.integer :create_id
      t.integer :group_id
      t.integer :theme_group_id
      t.integer :player_id
      t.timestamps
    end
  end
end
