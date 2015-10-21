shared_examples 'it defaults to the current time' do |factory_name, field|
  def make_subject(factory_name, attrs = {})
    create(factory_name, attrs)
  end

  def factory_resource(factory_name)
    factory_name.to_s.camelize.constantize
  end

  context 'for new resource' do
    it 'is the given time' do
      expected_time = 2.days.ago
      subject = make_subject(factory_name, field => expected_time)

      expect(subject.send(field).to_s).to eql(expected_time.to_s)
    end

    it 'is the current Time if nothing is given' do
      current_time = Time.current

      klass = factory_resource(factory_name)
      allow_any_instance_of(klass)
        .to receive(:current_time).and_return(current_time)

      subject = make_subject(factory_name, field => 'nil')
      expect(subject.send(field).to_s).to eql(current_time.to_s)
    end
  end

  context 'existing resource' do
    it 'is the existing value' do
      current_time = Time.current

      klass = factory_resource(factory_name)
      allow_any_instance_of(klass)
        .to receive(:current_time).and_return(current_time)

      make_subject(factory_name, field => current_time)
      subject = klass.first
      expect(subject.send(field).to_s).to eql(current_time.to_s)
    end
  end
end