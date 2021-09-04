require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get games_index_url
    assert_response :success
  end

  test "should get syllabaries" do
    get games_syllabaries_url
    assert_response :success
  end

  test "should get greats_men" do
    get games_greats_men_url
    assert_response :success
  end

  test "should get standards" do
    get games_standards_url
    assert_response :success
  end

  test "should get fade_outs" do
    get games_fade_outs_url
    assert_response :success
  end

  test "should get creates" do
    get games_creates_url
    assert_response :success
  end

end
