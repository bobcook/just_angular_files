module AuthHelpers
  def login_user(user = nil)
    @request.env['devise.mapping'] = Devise.mappings[:user]
    user = FactoryGirl.create(:user) unless user
    sign_in user
    user
  end
end
