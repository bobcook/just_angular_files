class ApplicationController < ActionController::Base
  include Wippersnapper::WIP

  protect_from_forgery with: :null_session
end
