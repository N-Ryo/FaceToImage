class Book < ApplicationRecord
  has_many :user_books, dependent: :destroy
  has_many :pages, dependent: :destroy
  belongs_to :user
  enum status: { draft: 0, published: 1 }
end
