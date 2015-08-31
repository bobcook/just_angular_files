require 'rails_helper'

describe OmniauthCreation do
  let(:test_class) do
    User
  end

  describe '.from_omniauth' do
    def make_auth(info_attrs = {}, credential_attrs = {})
      default_info_attrs = {
        uid: 'email@example.com',
        email: 'email@example.com',
        first_name: 'FIRST',
        last_name: 'LAST'
      }
      default_credential_attrs = {
        token: '123456'
      }
      OpenStruct.new(
        provider: 'PROVIDER',
        credentials:
          OpenStruct.new(default_credential_attrs.merge(credential_attrs)),
        info:
          OpenStruct.new(default_info_attrs.merge(info_attrs))
      )
    end

    context 'new user' do
      def make_subject
        test_class.new
      end

      it 'creates the new user' do
        subject = test_class
        auth = make_auth

        expect(subject).to receive(:create).and_return(test_class.new)
        subject.from_omniauth(auth)
      end

      it 'gives the user the appropriate attributes' do
        subject = test_class
        auth = make_auth
        expected_attrs = {
          email: auth.info.email,
          first_name: auth.info.first_name,
          last_name: auth.info.last_name
        }
        attr_keys = expected_attrs.keys

        result = subject.from_omniauth(auth)
        result_attrs = result.attributes.with_indifferent_access

        expect(result_attrs.slice(*attr_keys).values)
          .to match_array(expected_attrs.values)
      end

      it 'updates the auth_token for the user' do
        subject = test_class
        expected_token = '1234ABC'
        auth = make_auth({}, token: expected_token)

        result = subject.from_omniauth(auth)
        expect(result.auth_token).to eq(expected_token)
      end
    end

    context 'existing user' do
      it 'returns the existing user' do
        auth = make_auth
        existing_user = create(
          :user,
          provider: auth.provider,
          uid: auth.info.email,
          auth_token: auth.credentials.token
        )
        subject = test_class

        result = subject.from_omniauth(auth)
        expect(result).to eql(existing_user)
      end

      it 'updates the auth_token for the user' do
        auth = make_auth
        expected_token = auth.credentials.token
        create(
          :user,
          provider: auth.provider,
          uid: auth.info.email
        )
        subject = test_class

        result = subject.from_omniauth(auth)
        expect(result.auth_token).to eq(expected_token)
      end
    end
  end
end
