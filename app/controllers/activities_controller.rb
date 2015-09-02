class ActivitiesController < ApplicationController
  def index; end

  def show
    wip do
      @activity = OpenStruct.new(params.slice(:id, :type))
    end
  end
end
