module PathUtils
  def path_pillar
    %r{/\w\w/(\w+)/}.match(object.cms_url)[1]
  end

  def path_year
    %r{/(\d\d)/}.match(object.cms_url)[1]
  end
end
