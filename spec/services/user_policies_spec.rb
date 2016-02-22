require 'rails_helper'

describe UserPolicies do
  let(:subject) { UserPolicies.new }
  let(:paid_user) { create(:user, membership_status: :paid) }
  let(:unpaid_user) { create(:user) }

  describe '#paid_policy' do
    context 'given a paid user' do
      it 'returns true' do
        subject.user = paid_user

        expect(subject.paid?).to eq(true)
      end
    end
    context 'given an unpaid user' do
      it 'returns false' do
        subject.user = unpaid_user

        expect(subject.paid?).to eq(false)
      end
    end
  end

  describe '#unpaid_policy' do
    context 'given a paid user' do
      it 'returns false' do
        subject.user = paid_user

        expect(subject.unpaid?).to eq(false)
      end
    end
    context 'given an unpaid user' do
      it 'returns true' do
        subject.user = unpaid_user

        expect(subject.unpaid?).to eq(true)
      end
    end
  end

  describe '#current_user_policy' do
    context 'given a paid user' do
      it 'returns policy for paid user' do
        subject.user = paid_user
        policy = subject.current_user_policy

        expect(policy[:accessible_content]).to eq(
          %w(Articles Games Activities Recipes)
        )
      end
    end
    context 'given an unpaid user' do
      it 'retusn policy for unpaid user' do
        subject.user = unpaid_user
        policy = subject.current_user_policy

        expect(policy[:accessible_content]).to eq(%w(Articles Games))
      end
    end
  end
end
