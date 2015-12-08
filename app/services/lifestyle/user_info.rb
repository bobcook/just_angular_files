module Lifestyle
  class UserInfo
    include ActiveModel::SerializerSupport

    attr_reader :user_assessment_group

    def initialize(user_assessment_group)
      @user_assessment_group = user_assessment_group
    end

    def self.from_latest_questionnaire(user)
      user_assessment_group = user.user_assessment_groups.last
      new(user_assessment_group)
    end

    def self.attribute_names
      %i(birthday age years_of_ed handedness gender)
    end

    def birthday
      @birthday ||= response_to(birthday_question).try(:to_date)
    end

    def age
      @age ||= begin
        return unless birthday
        this_year = today.year

        this_year -
        birthday.year -
        (birthday.change(year: this_year) > today ? 1 : 0)
      end
    end

    def years_of_ed
      @years_of_ed ||= response_to(years_of_ed_question).try(:to_i)
    end

    def handedness
      @handedness ||= response_to(handedness_question)
    end

    def gender
      @gender ||= response_to(gender_question)
    end

    private

    def today
      @today ||= Time.now.utc.to_date
    end

    def response_to(question)
      responses.find_by(assessment_question: question).try(:response)
    end

    def birthday_question
      @birthday_question ||=
        questions.find_by(text: 'What is your date of birth?')
    end

    def years_of_ed_question
      @years_of_ed_question ||=
        questions.find_by(text: 'What is your years of education?')
    end

    def handedness_question
      @handedness_question ||=
        questions.find_by(text: 'Are you right-handed or left-handed?')
    end

    def gender_question
      @gender_question ||=
        questions.find_by(text: 'What is your gender?')
    end

    def first_questionnaire
      @first_questionnaire ||=
        user_assessment_group.lifestyle_user_assessments.first
    end

    def questions
      @questions ||= first_questionnaire.assessment_questions
    end

    def responses
      @responses ||= first_questionnaire.assessment_responses
    end
  end
end
