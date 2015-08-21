Rails.application.routes.draw do
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


  namespace :me, as: :my do
    resource :staying_sharp, controller: 'staying_sharp', only: [:show]
    resources :activities, only: [:show]
    resources :activity_reminders, only: [:edit, :update]
  end
end
