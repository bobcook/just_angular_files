class ActivitiesController < ApplicationController
  def index; end

  def show
    @activity = OpenStruct.new(params.slice(:id, :type))
  end
end
