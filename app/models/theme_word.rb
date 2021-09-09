class ThemeWord < ApplicationRecord
  
  belongs_to :group, optional: true
  # belongs_to :create
  belongs_to :player, optional: true

end
