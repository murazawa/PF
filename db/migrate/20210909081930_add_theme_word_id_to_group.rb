class AddThemeWordIdToGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :theme_word_id, :integer
  end
end
