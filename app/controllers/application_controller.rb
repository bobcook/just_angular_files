class ApplicationController < ActionController::Base
  include Wippersnapper::WIP

  respond_to :json

  protect_from_forgery with: :null_session
end
