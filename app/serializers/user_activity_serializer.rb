class UserActivitySerializer < ActiveModel::Serializer
  self.root = false

  attributes :activity

  def activity
    activity_json = ActivitySerializer.new(object.activity, root: false).as_json
    activity_json[:user_activity_periods] = activity_periods
    activity_json
  end

  private

  def activity_periods
    ActiveModel::ArraySerializer.new(
      object.stubbed_activity_periods,
      each_serializer: UserActivityPeriodSerializer
    ).as_json
  end
end
