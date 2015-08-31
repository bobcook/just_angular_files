module OmniauthCreation
  extend ActiveSupport::Concern

  class_methods do
    def from_omniauth(auth)
      found_user =
        where(provider: auth.provider, uid: auth.info.email)
        .first_or_create do |user|
          user.assign_attributes(attrs_from_auth(auth))
        end

      # In either case, update the auth token
      found_user.tap do |user|
        user.update_attributes(auth_token: auth.credentials.token)
      end
    end

    private

    def attrs_from_auth(auth)
      {
        email: auth.info.email,
        password: Devise.friendly_token[0, 20],
        first_name: auth.info.first_name,
        last_name: auth.info.last_name
      }
    end
  end
end
