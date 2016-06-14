require 'rails_helper'

describe Apis::MBS::AssessmentResults do
  describe ':from_results_data' do
    let(:subject) { Apis::MBS::AssessmentResults }

    it 'returns a new AssessmentResults instance' do
      expected_result_type = Apis::MBS::AssessmentResults

      results_data = {
        'assessment' => {
          'assessment_result' => {}
        }
      }

      result = subject.from_results_data(results_data)
      result_type = result.class

      expect(result_type).to eq(expected_result_type)
    end

    it 'accepts data without assessment key' do
      results_data = {}

      expect { subject.from_results_data(results_data) }.not_to raise_error
    end

    it 'accepts data with nil assessment value' do
      results_data = {
        'assessment' => nil
      }

      expect { subject.from_results_data(results_data) }.not_to raise_error
    end

    it 'accepts data without assessment results key' do
      results_data = {
        'assessment' => {}
      }

      expect { subject.from_results_data(results_data) }.not_to raise_error
    end

    it 'accepts data with nil assessment results value' do
      results_data = {
        'assessment' => {
          'assessment_result' => nil
        }
      }

      expect { subject.from_results_data(results_data) }.not_to raise_error
    end
  end
end
