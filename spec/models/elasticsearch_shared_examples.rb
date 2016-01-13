shared_examples 'it calls ElasticsearchIndexer' do |factory|
  it 'should call elasticsearch_indexer after save', elasticsearch: true do
    subject = build(factory)
    expect(subject).to receive(:elasticsearch_indexer)
    subject.save
  end

  it 'should call elasticsearch_indexer after destroy', elasticsearch: true do
    subject = create(factory)
    expect(subject).to receive(:elasticsearch_indexer)
    subject.destroy!
  end
end
