require 'rails_helper'

describe UserJwt do
  describe '::for' do
    it 'encodes the user id in the JWT' do
      user = create(:user)
      subject = described_class
      expect(JsonWebToken).to receive(:encode).with(user_id: user.id)
      subject.for(user)
    end
  end
end
