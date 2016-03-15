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
      resources :activities, only: [:index, :show] do
        resources :reviews,
                  controller: 'activities/reviews',
                  only: [:create, :index]
      end
      resources :articles, only: [:index, :show] do
        resources :reviews,
                  controller: 'articles/reviews',
                  only: [:create, :index]
      end
      resources :assessments, only: [:index, :show]
      resources :auth_tokens, only: [:show]
      resources :games, only: [:index, :show] do
        resources :reviews, controller: 'games/reviews', only: [:create, :index]
      end
      resources :free_games, only: [:index, :show] do
        resources :reviews, controller: 'games/reviews', only: [:create, :index]
      end
      resource :copy, controller: 'copy', only: :show
      resources :pillars, only: [:index]
      resources :recipes, only: [:index, :show] do
        resources :reviews,
                  controller: 'recipes/reviews',
                  only: [:create, :index]
      end
      resources :related_content, controller: 'related_content', only: [:index]
      resources :search, only: [:index]
      resource :explore_content, controller: 'explore_content', only: :show

      namespace :me, as: :my do
        resources :articles, only: [:index, :show, :create, :destroy]
        resources :activities, only: [:index, :show, :create, :destroy]
        resources :assessment_groups, only: [:create, :index, :update]
        resources :assessments, only: [:show, :update]
        resources :assessment_responses, only: [:index, :create]
        resources :assessment_results, only: [:create] do
          collection do
            resource :categories,
                     controller: 'assessment_results/categories',
                     only: [:show]
          end

          resource :neuro_performance,
                   controller: 'assessment_results/neuro_performance',
                   only: [:show]
          resource :lifestyle,
                   controller: 'assessment_results/lifestyle',
                   only: [:show]
          resource :user_info,
                   controller: 'assessment_results/user_info',
                   only: [:show]
        end

        resources :current_user,
                  controller: 'current_user',
                  only: [:index, :show]

        resources :games, only: [:show, :index, :create, :destroy]
        resources :recipes, only: [:index, :show, :create, :destroy]
        resources :recommended_content, only: [:index]
        resources :user_activities, only: [:show]
        resources :user_activity_periods, only: [:update]
      end

      # MyBrainSolutions auth endpoints
      namespace :mbs do
        post '/auth' => 'saml_idp#create'
        get '/metadata' => 'saml_idp#show'
        post '/saml_request' => 'saml#create'
        post '/assessments_callback' => 'assessments_callback#create'
      end

      namespace :policies do
        resource :current_user, only: [:show]
        resource :paid, only: [:show]
        resource :unpaid, only: [:show]
      end
    end
  end

  # TODO: can probably remove these, should verify
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
