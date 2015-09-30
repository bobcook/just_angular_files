class CustomFailure < Devise::FailureApp
  def respond
    json_failure
  end

  def json_failure
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = {
      errors: ['Not authorized']
    }.to_json
  end
end
