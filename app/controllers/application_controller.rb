class ApplicationController < ActionController::Base
  include Wippersnapper::WIP

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def set_angular_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token
  end
end
