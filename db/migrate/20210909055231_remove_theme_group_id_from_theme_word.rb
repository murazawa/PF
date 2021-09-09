class RemoveThemeGroupIdFromThemeWord < ActiveRecord::Migration[5.2]
  def change
    remove_column :theme_words, :theme_group_id, :integer
  end
end
