require 'rails_helper'

describe PillarQuerying do
  include CollectionUtils

  before(:each) do
    Pillar.default_types.each do |slug|
      create("#{slug}_pillar")
    end
  end

  def create_items_with(pillars, counts = {})
    pillars = pillars.respond_to?(:first) ? pillars : [pillars]

    counts.map do |factory_name, count|
      factory_name =
        case factory_name
        when :articles then :basic_article
        else factory_name.to_s.singularize
        end
      create_list(factory_name, count, pillars: pillars)
    end
  end

  def make_subject(options = {})
    PillarQuerying.new(options)
  end

  describe '#query' do
    it 'queries for the given pillars' do
      pillar = Pillar.first
      other_pillar = Pillar.last
      pillar_slug = pillar.slug

      query_counts = {
        recipes: 1,
        articles: 1,
        activities: 3
      }
      create_items_with(pillar, query_counts)
      create_items_with(
        other_pillar,
        recipes: 2,
        articles: 0,
        activities: 3
      )

      subject = make_subject(pillars: [pillar_slug], counts: query_counts)
      results = subject.query
      expect(results.flat_map(&:pillar_slugs)).to include(pillar_slug)
    end

    it 'returns the correct number of total items' do
      pillar = Pillar.first
      other_pillar = Pillar.last
      pillar_slug = pillar.slug
      other_pillar_slug = other_pillar.slug

      query_counts = {
        recipes: 2,
        articles: 1,
        activities: 3
      }
      actual_counts = map_values(query_counts) { |n| n * 2 }
      create_items_with([pillar, other_pillar], actual_counts)

      expected_num_returned = query_counts.values.sum
      subject = make_subject(
        pillars: [pillar_slug, other_pillar_slug],
        counts: query_counts
      )

      results = subject.query
      expect(results.size).to eq(expected_num_returned)
    end
  end

  describe '#recipes' do
    it 'returns the correct number of Recipes' do
      pillar = Pillar.first
      other_pillar = Pillar.last
      pillar_slug = pillar.slug
      other_pillar_slug = other_pillar.slug

      query_counts = {
        recipes: 2,
        articles: 1,
        activities: 3
      }
      actual_counts = map_values(query_counts) { |n| n * 2 }
      create_items_with([pillar, other_pillar], actual_counts)

      expected_num_recipes = query_counts[:recipes]
      subject = make_subject(
        pillars: [pillar_slug, other_pillar_slug],
        counts: query_counts
      )

      expect(subject.recipes.count).to eq(expected_num_recipes)
    end
  end

  describe '#articles' do
    it 'returns the correct number of Articles' do
      pillar = Pillar.first
      other_pillar = Pillar.last
      pillar_slug = pillar.slug
      other_pillar_slug = other_pillar.slug

      query_counts = {
        recipes: 3,
        articles: 4,
        activities: 1
      }
      actual_counts = map_values(query_counts) { |n| n * 2 }
      create_items_with([pillar, other_pillar], actual_counts)

      expected_num_articles = query_counts[:articles]
      subject = make_subject(
        pillars: [pillar_slug, other_pillar_slug],
        counts: query_counts
      )

      expect(subject.articles.count).to eq(expected_num_articles)
    end
  end

  describe '#activities' do
    it 'returns the correct number of Activities' do
      pillar = Pillar.first
      other_pillar = Pillar.last
      pillar_slug = pillar.slug
      other_pillar_slug = other_pillar.slug

      query_counts = {
        recipes: 1,
        articles: 1,
        activities: 3
      }
      actual_counts = map_values(query_counts) { |n| n * 2 }
      create_items_with([pillar, other_pillar], actual_counts)

      expected_num_activities = query_counts[:activities]
      subject = make_subject(
        pillars: [pillar_slug, other_pillar_slug],
        counts: query_counts
      )

      expect(subject.activities.count).to eq(expected_num_activities)
    end
  end
end
