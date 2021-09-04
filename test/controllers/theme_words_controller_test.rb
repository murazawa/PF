require 'test_helper'

class ThemeWordsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get theme_words_index_url
    assert_response :success
  end

  test "should get new" do
    get theme_words_new_url
    assert_response :success
  end

  test "should get edit" do
    get theme_words_edit_url
    assert_response :success
  end

  test "should get update" do
    get theme_words_update_url
    assert_response :success
  end

  test "should get destroy" do
    get theme_words_destroy_url
    assert_response :success
  end

end
