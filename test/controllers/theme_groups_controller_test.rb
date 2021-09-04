require 'test_helper'

class ThemeGroupsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get theme_groups_index_url
    assert_response :success
  end

  test "should get new" do
    get theme_groups_new_url
    assert_response :success
  end

  test "should get edit" do
    get theme_groups_edit_url
    assert_response :success
  end

  test "should get update" do
    get theme_groups_update_url
    assert_response :success
  end

  test "should get destroy" do
    get theme_groups_destroy_url
    assert_response :success
  end

end
