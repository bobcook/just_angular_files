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
  resources :articles, only: [:index, :show]
  resources :recipes, only: [:index, :show]
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
      resources :auth_tokens, only: [:show]

      namespace :me, as: :my do
        resources :user_activities, only: [:show, :index] do
          resources :histories, only: [:index, :show]
        end
        resources :activities, only: [] do
          resources :trackers, only: [:index]
        end
        resources :user_activity_periods, only: [:create]
        resources :activity_tracker_responses, only: [:create]
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
