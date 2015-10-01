class JsonWebToken
  def self.encode(payload, expiration = 24.hours.from_now)
    payload = payload.dup
    payload['exp'] = expiration.to_i
    JWT.encode(payload, ENV.fetch('JSON_WEB_TOKEN_SECRET'))
  end

  def self.decode(token)
    JWT.decode(token, ENV.fetch('JSON_WEB_TOKEN_SECRET')).first
  end
end
