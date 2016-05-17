require 'rails_helper'

describe EngagementLevelEmailTriggers do
  describe '#should_send_email?' do
    expected_results = [
      # last_seen_date , engagement_level, should send email
      [1.days.ago, 0, false],
      [2.days.ago, 0, false],
      [4.days.ago, 0, false],
      [5.days.ago, 0, true],

      [1.days.ago, 1, false],
      [2.days.ago, 1, true],
      [4.days.ago, 1, false],
      [5.days.ago, 1, false],

      [1.days.ago, 2, false],
      [2.days.ago, 2, false],
      [4.days.ago, 2, false],
      [5.days.ago, 2, true],

      [1.days.ago, 3, false],
      [2.days.ago, 3, false],
      [4.days.ago, 3, false],
      [5.days.ago, 3, true],

      [5.days.ago, 1000, false],
      [2.days.ago, 1000, false],
      [100.days.ago, 0, false],
      [-10.days.ago, 1, false],
      [100.days.ago, 2, false],
      [100.days.ago, 3, false],
      [100, 3, false],
      ['2.days.ago', 3, false],
      ['100', 3, false],
      [2.days.ago, 'engage', false]
    ]
    it 'applies triggering rules to determine if email should be sent' do
      expected_results.each do |params|
        last_seen_date, engagement_level, expected_result = params
        email_trigger =
          EngagementLevelEmailTriggers
          .should_send_email?(engagement_level, last_seen_date)
        expect(email_trigger).to(
          eq(expected_result),
          "expected last_seen_date = #{last_seen_date} " \
          "and engagement_level = #{engagement_level} " \
          "to return #{expected_result}"
        )
      end
    end
  end
end
