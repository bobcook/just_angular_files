module ReviewableResource
  def create
    current_user.reviews.create(
      reviewable: reviewable_instance,
      recommend: params[:review][:recommend]
    )
    head :created
  end

  def index
    render(
      json: reviewable_instance.reviews,
      each_serializer: ReviewSerializer
    )
  end

  private

  def reviewable_instance
    @reviewable_instance ||=
      reviewable_resource_type
      .friendly.find(params["#{reviewable_resource_name}_id"])
  end

  def reviewable_resource_type
    fail 'Must be defined in mixed-in classes of ReviewableResource'
  end

  def reviewable_resource_name
    reviewable_resource_type.name.downcase
  end
end
