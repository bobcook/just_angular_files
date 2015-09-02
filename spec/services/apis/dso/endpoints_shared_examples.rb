RSpec.shared_examples 'it hits the correct endpoint' do |args|
  verb = args[:verb]
  endpoint = args[:endpoint]
  method = args[:method]
  token = args[:token] || '123'

  it "#{verb.to_s.upcase}s #{endpoint}" do
    http = double
    token_cache = double
    subject = make_subject(http, token_cache)

    allow(subject).to receive(:http).and_return(http)
    allow(subject).to receive(:token_cache).and_return(token_cache)
    allow(subject).to receive(:make_response)
    allow(token_cache).to receive(:with_provider_token).and_yield(token)
    expect(http).to receive(verb).with(endpoint, anything, anything)

    if method.respond_to?(:call)
      method.call(subject)
    else
      subject.send(method)
    end
  end
end
