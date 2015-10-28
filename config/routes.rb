Rails.application.routes.draw do
  devise_for :users,
             path: '/api/v1/users',
             controllers: {
               omniauth_callbacks: 'users/omniauth_callbacks'
             },
             skip: [:registrations, :sessions]

  devise_scope :user do
    delete '/api/v1/users/auth',
           to: 'users/sessions#destroy',
           as: :destroy_user_session
  end

  root to: 'home#show'
  resource :home, controller: 'home', only: :show
  resources :activities, only: [:index, :show]

  resource :search, controller: 'search', only: [:show]
  resource :assessment, controller: 'assessment', only: [:show] do
    # TODO: revisit when we do assessments
    get :question
    get :conclusion
  end

  resource :auth_callback, controller: 'auth_callback' do
    get :next_page
  end

  namespace :api do
    namespace :v1 do
      resources :activities, only: [:index, :show]
      resources :articles, only: [:index, :show] do
        resources :reviews, controller: 'articles/reviews', only: [:create, :index]
      end
      resources :auth_tokens, only: [:show]
      resources :games, only: [:index, :show] do
        resources :reviews, controller: 'games/reviews', only: [:create, :index]
      end
      resource :copy, controller: 'copy', only: :show
      resources :pillars, only: [:index]
      resources :recipes, only: [:index, :show]
      resources :related_content, only: [:index]

      namespace :me, as: :my do
        resources :articles, only: [:show, :index, :create, :destroy]
        resources :games, only: [:show, :index, :create, :destroy]
        resources :user_activities, only: [:show]
        resources :user_activity_periods, only: [:update]
        resources :current_user, controller: 'current_user', only: :index
        resources :articles, only: [:create, :index, :show]
      end

      # MyBrainSolutions auth endpoints
      namespace :mbs do
        post '/auth' => 'saml_idp#create'
        get '/metadata' => 'saml_idp#show'
        post '/assessments_login' => 'saml#create'
        post '/assessments_callback' => 'assessments_callback#create'
      end
    end
  end

  namespace :me, as: :my do
    resources :activities, only: [:create] do
      resources :tracker_responses,
                only: [:new, :create],
                controller: 'activities/tracker_responses'
      resource :reminder_settings,
               only: [:new, :edit, :create, :update],
               controller: 'activities/reminder_settings'
    end
    resource :staying_sharp, controller: 'staying_sharp', only: [:show]
  end
end
