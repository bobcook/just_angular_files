class ActivitiesController < ApplicationController
  before_action :set_cache_control_headers, only: [:index, :show]
  # TODO: only allow paid users to see actitivies
  before_action :authenticate_user!, only: [:index, :show]

  def index
    @collection = present(filtered_activities)
    set_surrogate_key_header Activity.table_key, @collection.map(&:record_key)
    flash[:explanation] = I18n.t('explanation.activities')
  end

  def show
    @activity = Activity.find(params[:id])
    set_surrogate_key_header @activity.record_key
  end

  private

  def present(activities)
    Presenter.present_all(activities, roles: [Roles::AsCard])
  end

  def filtered_activities
    PillarFiltering.new(Activity.all, params).paginated_collection
  end
end
