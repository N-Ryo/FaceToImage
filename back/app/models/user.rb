class User < ApplicationRecord
    has_many :books, dependent: :destroy
    has_many :user_books, dependent: :destroy
end
