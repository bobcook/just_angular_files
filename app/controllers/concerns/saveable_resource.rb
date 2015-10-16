module SaveableResource
  def create
    current_user.send(saveable_resource_name.pluralize) << instance_to_save
    head :created
  end

  def destroy
    user_resource = user_resource_type.find_by(
      user_id: current_user.id,
      "#{saveable_resource_name}_id" => params[:id]
    )
    user_resource.destroy
    head :accepted
  end

  private

  # Ex: Recipe
  def saveable_resource_type
    fail 'Must be defined in mixed-in classes of SaveableResource'
  end

  # Ex: UserRecipe
  def user_resource_type
    "User#{saveable_resource_type.name}".constantize
  end

  def saveable_resource_name
    saveable_resource_type.name.downcase
  end

  def instance_to_save
    @instance_to_save ||= saveable_resource_type.find(
      params[saveable_resource_name][saveable_resource_name + '_id']
    )
  end
end
