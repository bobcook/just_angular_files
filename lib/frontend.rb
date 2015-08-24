require 'fileutils'

module Frontend
  def self.update!(frontend_repo_path)
    Frontend.new(frontend_repo_path).update!
  end

  module Common
    def base_path(*subpaths)
      full_subpath = [base_dir] + subpaths
      Rails.root.join(*full_subpath)
    end

    def remove_dir(dir)
      FileUtils.rm_r(dir.to_s) if dir_exists?(dir)
    end

    def create_dir(dir)
      FileUtils.mkdir_p dir.to_s
    end

    def dir_exists?(dir)
      File.exist? dir.to_s
    end

    def methods_for_copy
      %w(fonts images javascripts stylesheets)
    end
  end

  class Frontend
    include Common

    attr_reader :frontend_repo_path

    def initialize(frontend_repo_path)
      @frontend_repo_path = frontend_repo_path
    end

    # Assummptions:
    #
    # * `bundle exec rake frontend:update has been run
    def update!
      source_and_dest.each(&:before_update)
      methods_for_copy.each(&method(:copy_dir))
    end

    private

    def copy_dir(dir_method)
      source_dir = source.send(dir_method).to_s
      dest_dir = dest.send(dir_method).to_s

      FileUtils.cp_r(source_dir + '/.', dest_dir)
    end

    def source_and_dest
      [source, dest]
    end

    def source
      @source ||= Source::Files.new(frontend_repo_path)
    end

    def dest
      @dest ||= Destination::Files.new
    end
  end

  module Source
    class Files
      include Common
      attr_reader :base_dir

      def initialize(base_dir = Rails.root.join('frontend-aarp-azul7'))
        @base_dir = base_dir
      end

      def before_update; end

      def fonts
        @fonts ||= base_path('fonts')
      end

      def images
        @images ||= base_path('images')
      end

      def javascripts
        @javascripts ||= base_path('scripts')
      end

      def stylesheets
        @stylesheets ||= base_path('styles')
      end
    end
  end

  module Destination
    class Files
      include Common

      attr_reader :base_dir

      def initialize(base_dir = Rails.root.join('vendor', 'assets'))
        @base_dir = base_dir
      end

      def before_update
        remove_existing_dirs
        create_dirs
      end

      def fonts
        @fonts ||= base_path('fonts', 'azul7')
      end

      def images
        @images ||= base_path('images', 'azul7')
      end

      def javascripts
        @javascripts ||= base_path('javascripts', 'azul7')
      end

      def stylesheets
        @stylesheets ||= base_path('stylesheets', 'azul7')
      end

      private

      def dirs_for_copy
        methods_for_copy.map { |m| send(m) }
      end

      def remove_existing_dirs
        dirs_for_copy.each(&method(:remove_dir))
      end

      def create_dirs
        dirs_for_copy.each(&method(:create_dir))
      end
    end
  end
end
