class List < ApplicationRecord
  belongs_to :project
  has_many :cards
end
