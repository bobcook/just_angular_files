# TODO: consider getting rid of ActivityTrackerQuestion since we are not
# showing questions for the various activity trackers
class ActivityTrackerQuestion < ActiveRecord::Base
  belongs_to :activity_tracker
  has_many :activity_tracker_responses
end
