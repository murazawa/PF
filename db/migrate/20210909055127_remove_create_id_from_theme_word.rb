class RemoveCreateIdFromThemeWord < ActiveRecord::Migration[5.2]
  def change
    remove_column :theme_words, :create_id, :integer
  end
end
