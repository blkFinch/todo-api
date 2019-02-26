class User < ApplicationRecord
  has_secure_password

  validates :username, :password, presence: true
  validates :username, uniqueness: true
  validates :password, length:{ minimum: 4 }

  def is_admin?
    self.permission_level >= 1
  end

  def self.from_token_request(request)
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by(username: username)
  end
end
