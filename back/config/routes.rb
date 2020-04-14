Rails.application.routes.draw do
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :users
      resources :books do
        member do
          resources :pages, only: [:create, :destroy] do
            member do
              resources :images, only: [:create, :destroy]
            end
          end
        end
      end
    end
  end
end
