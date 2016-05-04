module OmniauthCreation
  extend ActiveSupport::Concern

  class_methods do
    def from_omniauth(auth)
      found_user =
        where(provider: auth.provider, uid: auth.info.external_id)
        .first_or_create do |user|
          user.assign_attributes(attrs_from_auth(auth))
        end

      # In either case, update the given credentials
      update_user_info(found_user, auth)
    end

    private

    def update_user_info(found_user, auth)
      found_user.tap do |user|
        user.update_attributes(
          auth_token: auth.credentials.token,
          membership_status: auth.info.membership_status,
          membership_product: auth.info.membership_product,
          membership_expiration: auth.info.membership_expiration
        )
      end
    end

    def attrs_from_auth(auth)
      {
        external_id: auth.info.external_id,
        password: Devise.friendly_token[0, 20],
        first_name: auth.info.first_name
      }
    end
  end
end
