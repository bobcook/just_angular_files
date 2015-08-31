require 'rails_helper'

module Users
  describe SessionsController do
    describe '#destroy' do
      let!(:user) { login_user }

      it 'calls the DSO api to destroy the user session' do
        expect_any_instance_of(Apis::DSO::Endpoints)
          .to receive(:logout)

        delete :destroy
      end
    end
  end
end
