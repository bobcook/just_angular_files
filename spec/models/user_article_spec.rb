require 'rails_helper'

describe UserArticle do
  it { should belong_to(:user) }
  it { should belong_to(:article) }

  it 'validates uniqueness of user and article' do
    user = create(:user)
    article = create(:article, type: :basic)

    user_article_1 = create(:user_article, user: user, article: article)
    expect(user_article_1).to be_valid

    user_article_2 = build(:user_article, user: user, article: article)
    expect(user_article_2).to be_invalid
  end
end
