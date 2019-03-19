class User < ApplicationRecord
  has_secure_password

  has_many :projects

  validates :username, :password, presence: true
  validates :username, uniqueness: true
  validates :password, length:{ minimum: 4 }

  self.ignored_columns = %w(password)

  def is_admin?
    self.permission_level >= 1
  end

  def as_public_json
    {
      "username": self.username,
      "email": self.email,
      "id": self.id,
      "permission": self.permission_level
    }
  end

  def self.from_token_request(request)
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by(username: username)
  end
end
