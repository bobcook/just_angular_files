FactoryGirl.define do
  factory :user_assessment do
    transient do
      with_mbs_assessment false
    end

    assessment
    user_assessment_group

    sequence(:order) { |n| n }

    trait :with_mbs_results do
      assessment nil

      transient do
        with_mbs_assessment true
      end

      sequence(:raw_results) do
        # TODO: better results
        {
          'emotion_score' => '0',
          'thinking_score' => '3.5',
          'feeling_score' => '0',
          'self_regulation_score' => '0',
          'recommended_solutions' => 'EFacesandNames',
          'integ_q_score' => '0',
          'emotion_text' => nil,
          'thinking_text' => nil,
          'feeling_text' => nil,
          'self_regulation_text' => nil,
          'profile_my_brain' => 'ToComplete',
          'profile_emotion' => nil,
          'profile_thinking' => 'Novelty engaged',
          'profile_feeling' => nil,
          'profile_sr' => nil,
          'profile_description' => 'PROFILE DESCRIPTION',
          'communication' => nil,
          'learning_work' => nil,
          'live_events' => nil,
          'quality_life' => nil,
          'brain_training' => nil,
          'emotion_training' => nil,
          'thinking_training' => nil,
          'feeling_training' => nil,
          'sr_training' => nil,
          'goals_training' => nil,
          'category_order' => 'Emotion,Feeling,SelfRegulation,Thinking',
          'overall_score' => '3.5',
          'thinking_score_motor_coordination' => '1.2',
          'thinking_score_processing_speed' => '3.4',
          'thinking_score_sustained_attention' => '4.5',
          'thinking_score_controlled_attention' => '5.6',
          'thinking_score_flexibility' => '6.7',
          'thinking_score_inhibition' => '7.8',
          'thinking_score_working_memory' => '8.9',
          'thinking_score_recall_memory' => '9.0',
          'thinking_score_executive_function' => '9.5',
          'emotion_score_identifying_emotions' => '0',
          'emotion_score_emotion_bias' => '0',
          'feeling_score_stress_level' => '0',
          'feeling_score_anxiety_level' => '0',
          'feeling_score_depressed_mood_level' => '0',
          'self_regulation_score_positivity_negativity_bias' => '0',
          'self_regulation_score_resilience' => '0',
          'self_regulation_score_social_capacity' => '0'
        }
      end
    end

    after(:create) do |user_assessment, ev|
      assessment = AssessmentMBS.first || create(:mbs_assessment)
      user_assessment.update(assessment: assessment) if ev.with_mbs_assessment
    end
  end
end
