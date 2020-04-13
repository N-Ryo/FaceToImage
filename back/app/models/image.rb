class Image < ApplicationRecord
  belongs_to :image_option, dependent: :destroy
end
