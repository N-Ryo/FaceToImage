class UserBook < ApplicationRecord
  belongs_to :user
  belongs_to :book
  belongs_to :page
end
