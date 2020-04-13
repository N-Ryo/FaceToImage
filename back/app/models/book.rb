class Book < ApplicationRecord
  has_many :user_books, dependent: :destroy
  has_many :pages, dependent: :destroy
  belongs_to :user
end
