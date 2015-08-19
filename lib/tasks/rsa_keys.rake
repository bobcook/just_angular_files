namespace :rsa_keys do
  desc 'Formats an RSA key (public or private) for use in env vars'
  task format: :environment do
    key_file = ENV.fetch('KEY_FILE')
    p File.open(key_file).read
  end
end
