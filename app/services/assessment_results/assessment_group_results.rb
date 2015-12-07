module AssessmentResults
  class AssessmentGroupResults
    attr_reader :user, :current_user_assessment_group

    def initialize(user, current_user_assessment_group)
      @user = user
      @current_user_assessment_group = current_user_assessment_group
    end

    def neuro
      @neuro ||=
        historic_assessment_groups.map(&method(:neuro_performance_result))
    end

    def lifestyle
      @lifestyle ||=
        historic_assessment_groups.map(&method(:lifestyle_result))
    end

    def historic_assessment_groups
      @historic_assessment_groups ||=
        user
        .user_assessment_groups
        .order('user_assessment_groups.id DESC')
        .upto_id(current_user_assessment_group.id)
        .select(&:completed?)
    end

    private

    def neuro_performance_result(user_assessment_group)
      NeuroPerformanceResults.build_for(user_assessment_group)
    end

    def lifestyle_result(user_assessment_group)
      LifestyleAssessmentResults.new(user_assessment_group)
    end

    # TODO: refactor to eliminate duplication here and in
    # NeuroPerformanceResults
    class LifestyleAssessmentResults
      include ActiveModel::SerializerSupport

      attr_reader :user_assessment_group, :results

      delegate(
        *Lifestyle::AssessmentResults.lifestyle_category_names,
        to: :results
      )

      delegate :id, :created_at, to: :user_assessment_group

      def initialize(user_assessment_group)
        @user_assessment_group = user_assessment_group
      end

      def self.build_for(user_assessment_group)
        new(user_assessment_group)
      end

      private

      def results
        @results ||=
          Lifestyle::AssessmentResults.new(lifestyle_responses)
      end

      def lifestyle_responses
        @lifestyle_responses ||=
          user_assessment_group
          .lifestyle_user_assessments
          .flat_map(&:assessment_responses)
      end
    end

    class NeuroPerformanceResults
      include ActiveModel::SerializerSupport

      attr_reader :user_assessment_group, :results

      delegate(
        *Apis::MBS::AssessmentResults.neuro_category_names,
        to: :results
      )

      # TODO: consider adding a completed_at field to UAG
      delegate :id, :created_at, to: :user_assessment_group

      def initialize(user_assessment_group)
        @user_assessment_group = user_assessment_group
      end

      def self.build_for(user_assessment_group)
        new(user_assessment_group)
      end

      private

      def mbs_user_assessment
        @mbs_user_assessment ||= user_assessment_group.mbs_user_assessment
      end

      def results
        @results ||= mbs_user_assessment.results
      end
    end
  end
end
