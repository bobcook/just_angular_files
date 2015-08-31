class User < ActiveRecord::Base
  include OmniauthCreation

  devise :database_authenticatable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:aarp]
end
