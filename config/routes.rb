Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               omniauth_callbacks: 'users/omniauth_callbacks'
             },
             skip: [:registrations, :sessions]

  devise_scope :user do
    delete 'sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
  end

  root to: 'home#show'
  resource :home, controller: 'home', only: :show
  resources :articles, only: [:index, :show]
  resources :recipes, only: [:index, :show]
  resources :activities, only: [:index, :show]
  resource :search, controller: 'search', only: [:show]
  resources :challenges, only: :index
  resource :assessment, controller: 'assessment', only: [:show] do
    # TODO: revisit when we do assessments
    get :question
    get :conclusion
  end

  resource :auth_callback, controller: 'auth_callback' do
    get :next_page
  end

  namespace :me, as: :my do
    resource :staying_sharp, controller: 'staying_sharp', only: [:show]
    resources :activities, only: [:show]
    resources :activity_reminders, only: [:edit, :update]
  end
end
