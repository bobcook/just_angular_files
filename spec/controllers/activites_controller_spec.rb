require 'rails_helper'

describe ActivitiesController do
  describe '#index' do
    let!(:user) { login_user }

    it 'filters activites based on the pillar param' do
      pillar_filtering = double
      params = {
        pillar: Pillar.default_types.first
      }
      allow(PillarFiltering).to receive(:new).and_return(pillar_filtering)
      expect(pillar_filtering)
        .to receive(:paginated_collection).and_return(Activity.all)

      get :index, params
    end
  end
end
