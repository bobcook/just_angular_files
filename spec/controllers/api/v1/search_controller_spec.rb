require 'rails_helper'

module Api
  module V1
    describe SearchController do
      INDEXED_RESOURCES = [Article, Activity, Game, Recipe]

      def create_content
        create(:article, title: 'Fish Article')
        create(:game, title: 'Fish Game')
        create(:activity, title: 'Fish Activity')
        create(:recipe, title: 'Fish Recipe')
        create(:article, title: 'Sleep Article')
        create(:activity, title: 'Sleep Activity')
      end

      def create_with_payload(payload: {}, type: :article, num: 1)
        create_list(type, num, payload: payload)
      end

      def item_ids(response)
        JSON.parse(response.body)['items'].map { |i| i['id'] }
      end

      def index_content
        INDEXED_RESOURCES.each do |model|
          model.__elasticsearch__.create_index!(force: true)
          model.import
          model.__elasticsearch__.refresh_index!
        end
      end

      describe '#index' do
        it 'returns zero records if no content matches search terms' do
          create_content
          index_content

          params = {
            keywords: 'blah'
          }
          get(:index, params)
          obj = JSON.parse(response.body)

          expect(obj['items'].length).to be(0)
        end

        it 'returns no content if query is nil' do
          get :index

          expect(response.body).to eq('')
        end

        it 'has 204 status if query is nil' do
          get :index

          expect(response.status).to eq(204)
        end

        context 'for paid user' do
          let(:user) { create(:user, membership_status: :paid) }
          before { login_user(user) }

          it 'returns matched records for all content types' do
            create_content
            index_content

            params = {
              keywords: 'fish'
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(4)
          end

          it 'gets paid and free games' do
            create(:game, :paid, title: 'Fish Paid Game')
            create_content
            index_content

            params = {
              keywords: 'fish',
              content_type: 'games'
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(2)
          end

          it 'gets records with keywords in the section1Body field' do
            keyword = 'Howdy'
            with_payload = create_with_payload(
              num: 2,
              payload: { section1Body: "#{keyword} there" }
            )

            create_with_payload(num: 2, payload: {})
            index_content

            params = {
              keywords: keyword
            }
            get(:index, params)

            expect(item_ids(response)).to match_array(with_payload.map(&:id))
          end

          it 'gets records with keywords in the section2Body field' do
            keyword = 'Howdy'
            with_payload = create_with_payload(
              num: 2,
              payload: { section2Body: "#{keyword} there" }
            )

            create_with_payload(num: 2, payload: {})
            index_content

            params = {
              keywords: keyword
            }
            get(:index, params)

            expect(item_ids(response)).to match_array(with_payload.map(&:id))
          end

          it 'gets records with keywords in the section2Body field' do
            keyword = 'Howdy'
            with_payload = create_with_payload(
              num: 2,
              payload: { section2Body: "#{keyword} there" }
            )

            create_with_payload(num: 2, payload: {})
            index_content

            params = {
              keywords: keyword
            }
            get(:index, params)

            expect(item_ids(response)).to match_array(with_payload.map(&:id))
          end

          it 'gets records with keywords in the ' \
             'contentSourceBrandingImageDescription field' do
            keyword = 'Johns Hopkins'
            with_payload = create_with_payload(
              num: 2,
              payload: {
                contentSourceBrandingImageDescription: "#{keyword} logo"
              }
            )

            create_with_payload(num: 2, payload: {})
            index_content

            params = {
              keywords: keyword
            }
            get(:index, params)

            expect(item_ids(response)).to match_array(with_payload.map(&:id))
          end
        end

        context 'for unpaid user' do
          it 'returns matched records for all content types' do
            create_content
            index_content

            params = {
              keywords: 'fish'
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(2)
          end

          it 'gets paid and free games' do
            create(:game, :paid, title: 'Fish Paid Game')
            create_content
            index_content

            params = {
              keywords: 'fish',
              content_type: 'games'
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(1)
          end
        end

        context 'content type is passed in' do
          it 'returns matched records for specified content type' do
            create_content
            index_content

            params = {
              keywords: 'fish',
              content_type: 'articles'
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(1)
          end
        end

        context 'pillar is passed in' do
          before(:each) do
            Pillar.default_types.each do |slug|
              create("#{slug}_pillar")
            end
          end

          it 'returns matched records for specified old pillar' do
            pillar1 = Pillar.first
            pillar2 = Pillar.second
            create(:article, title: 'fish',
                             payload: { brainHealthPillar: pillar1.name })
            create(:article, title: 'fish',
                             payload: { brainHealthPillar: pillar2.name })
            index_content

            params = {
              keywords: 'fish',
              pillar: pillar1.name
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(1)
          end

          it 'returns matched records for specified new pillar' do
            pillar = Pillar.first
            create(:article,
                   title: 'fish',
                   payload: { brainHealthPillar: pillar.name })
            create(:article,
                   title: 'fish',
                   payload: { brainHealthPillar: pillar.display_name })
            index_content

            params = {
              keywords: 'fish',
              pillar: pillar.name
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(2)
          end
        end

        context 'page is passed in' do
          it 'returns records for specified page' do
            allow(I18n)
              .to receive(:t)
              .with('config.pagination.search_per_page')
              .and_return(4)

            create_list(:article, 6, title: 'fish')
            index_content

            params = {
              keywords: 'fish',
              content_type: 'articles',
              page: 2
            }
            get(:index, params)
            obj = JSON.parse(response.body)

            expect(obj['items'].length).to be(2)
          end
        end
      end
    end
  end
end
