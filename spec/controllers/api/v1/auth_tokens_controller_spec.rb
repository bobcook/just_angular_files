require 'rails_helper'

describe Api::V1::AuthTokensController do
  describe 'GET #show' do
    context 'when the claim token exists' do
      let!(:token_holder) { create :claim_token_holder }

      it 'returns an auth token' do
        get :show, id: token_holder.claim_token
        expect(response.body.delete '"').to eq token_holder.auth_token
      end

      it 'deletes the claim token holder' do
        expect { get :show, id: token_holder.claim_token }
          .to change { ClaimTokenHolder.count }.by(-1)
      end
    end

    context 'when the claim token does not exist' do
      it 'returns an error' do
        get :show, id: 'not a token'
        expect(response.status).to eq 401
        expect(JSON.parse(response.body)['error'].present?).to eq true
      end
    end

    it 'destroys expired claim token holders' do
      old_token_holder = create :claim_token_holder, created_at: 1.day.ago
      new_token_holder = create :claim_token_holder
      expect { get :show, id: new_token_holder.claim_token }
        .to change { ClaimTokenHolder.count }.by(-2)
      expect(ClaimTokenHolder.find_by id: old_token_holder.id).to eq nil
    end
  end
end
