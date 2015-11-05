# Expects including controllers to define:
# * #resource (must define #newest_first)
# * #serializer
module PaginatedResource
  def show
    options = { serializer: serializer }

    instance ? respond_with(instance, options) : not_found
  end

  def index
    options = { each_serializer: serializer }
    options.merge!(status: :partial_content) unless collection.last_page?
    respond_with collection, options
  end

  private

  def serializer
    fail 'Must be defined in mixed-in classes of PaginatedResource'
  end

  def resource
    fail 'Must be defined in mixed-in classes of PaginatedResource'
  end

  def instance
    @instance ||= resource.includes(instance_includes).find_by(id: params[:id])
  end

  def instance_includes
    @instance_includes ||= [:pillars]
  end

  def sorted_collection
    @sorted_collection ||= resource.newest_first
  end

  def collection
    @collection ||= sorted_collection.page(params[:page]).per(per_page)
  end

  def per_page
    params[:per_page] || I18n.t('config.pagination.per_page')
  end

  def not_found
    render json: { error: 'Content not found' }, status: :no_content
  end
end
