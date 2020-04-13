class Page < ApplicationRecord
  belongs_to :book
  has_many :images, dependent: :destroy
  has_many :user_books
end
