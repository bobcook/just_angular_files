class UserPolicies
  attr_accessor :user

  def initialize(user = nil)
    @user = user
  end

  def paid?
    user.present? && user.paid?
  end

  def unpaid?
    user.nil? || !user.paid?
  end

  def current_user_policy
    {
      accessible_content: accessible_content
    }
  end

  private

  def accessible_content
    paid? ? paid_accessible_content : unpaid_accessible_content
  end

  def unpaid_accessible_content
    %w(Articles Games)
  end

  def paid_accessible_content
    %w(Articles Games Activities Recipes)
  end
end
