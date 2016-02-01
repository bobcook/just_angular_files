class EngagementEmails
  include WithFaraday

  attr_reader :http, :current_user

  def initialize(current_user, options = {})
    @current_user = current_user
    @http = options[:http] || faraday
  end

  def send_later
    EngagementEmailJob.perform_later(current_user)
  end

  def send
    http.post(ss_endpoint, ss_data)
  end

  def update_assessment_status?
    current_user.user_assessment_groups.count == 1
  end

  def update_activity_status?
    current_user.user_activities.count == 1 &&
      current_user.user_assessment_groups.any?(&:completed?)
  end

  private

  def aarp_date_format
    I18n.t('date.formats.aarp_api')
  end

  def ss_data
    {
      initiateEngagement: {
        idpId: current_user.uid,
        dataExtension: 'SM_1398936_SS_Sharecare_User_Data_DE',
        personalizers: [
          {
            key: 'First_Name',
            value: current_user.first_name
          },
          {
            key: 'Last_Login',
            value: last_login
          },
          {
            key: 'Last_Update_Date',
            value: last_update_date
          },
          {
            key: 'Engagement_Level',
            value: current_user.engagement_level
          },
          {
            key: 'Subscription_Plan',
            value: current_user.membership_status.to_s
          }
        ]
      }
    }
  end

  def last_login
    last_signin = current_user.last_sign_in_at
    if last_signin
      last_signin.strftime(aarp_date_format)
    else
      Time.zone.now.strftime(aarp_date_format)
    end
  end

  def last_update_date
    Time.now.utc.strftime(aarp_date_format)
  end

  def ss_endpoint
    "#{ENV.fetch('DSO_API')}/gems/initiateEngagement"
  end
end
