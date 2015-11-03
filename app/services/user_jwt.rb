class UserJwt
  def self.for(user)
    JsonWebToken.encode('user_id': user.id)
  end
end
