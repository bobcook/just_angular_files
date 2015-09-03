FactoryGirl.define do
  factory :activity_tracker do
    name 'binary'

    ActivityTracker.default_types.each do |t|
      factory "#{t}_tracker" do
        name t
      end
    end
  end
end
