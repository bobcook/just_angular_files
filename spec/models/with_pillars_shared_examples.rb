shared_examples 'it fulfills the WithPillars interface' do |factory|
  it 'responds to ::for_pillar' do
    subject = create(factory)
    expect(subject.class).to respond_to(:for_pillar)
  end

  it 'responds to #pillar_names' do
    subject = create(factory)
    expect(subject).to respond_to(:pillar_names)
  end

  it 'responds to #pillar_slugs' do
    subject = create(factory)
    expect(subject).to respond_to(:pillar_slugs)
  end

  it 'responds to #displayable_pillar_names' do
    subject = create(factory)
    expect(subject).to respond_to(:displayable_pillar_names)
  end
end
