class ClaimTokenHolder < ActiveRecord::Base
  scope :expired, -> { where 'created_at < ?', ClaimTokenHolder.expiry_date }

  validates :claim_token, :auth_token, presence: true

  def self.create_from_auth_token!(auth_token)
    # keep trying to create a new record if the friendly_token is taken
    loop do
      created = false

      token = find_or_create_by claim_token: Devise.friendly_token do |t|
        t.auth_token = auth_token
        created = true
      end

      break token if created
    end
  end

  def self.expiry_date
    30.minutes.ago
  end

  def expired?
    created_at < ClaimTokenHolder.expiry_date
  end
end
