class InquiryMailer < ApplicationMailer
  default from: "example@example.com" #送信元
  
  
  def received_email(inquiry)
    @inquiry = inquiry
    mail(:to => inquiry.email, :subject => 'お問い合わせ承りました')
  
  end
end
