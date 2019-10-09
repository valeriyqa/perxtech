import webdriver, {Builder, By, Key, until, util} from "selenium-webdriver";
 export default class SignInPage {
  constructor() {
    this.reward_admin_email = 'reward_admin@dashboard.com';
    this.reward_admin_password = 'reward_admin';
    this.rewardsListUrl ="https://www.perxtech.io/dashboard/p/rewards/list";
    this.adminDashboardUrl = 'https://www.perxtech.io/dashboard/p/reports/downloads';
    this.loginUrl = "https://www.perxtech.io/dashboard";
    this.admin_email = 'admin@dashboard.com';
    this.admin_password = 'admin1234';
    this.pathToTXTFile = `${__dirname}/users.txt`;
    this.pathToCSVFile = `${__dirname}/users.csv`;
    this.pathToLXLSFile = `${__dirname}/users.xlsx`;
    
    this.testRewardName = "1 test reward name";
    this.emailFieldID = 'email';
    this.passwordFieldID = 'password';
    this.submitButtonXpath = "//button[@type='submit']";
    this.rewardsBlockXpath = "//li[@data-key='rewards']";
    this.newRewardButtonXpath = '//button';
    this.rewardNameField = "name_en";
    this.addFieldButton = "//button[@type = 'button']//span[text()='Add New']/..";
    this.switchCustomFieldsBlock = "(//button[@role = 'switch'])[6]";
    this.createdCustomField = "//label[text()= 'Custom Field ']";
    this.privateRewardRadiobutton = "(//input[@name = 'reward_publicity_type'])[2]";
    this.cataloguesField = "//label[@title = 'Catalogues']";
    this.labelsField = "//label[@title = 'Labels']";
    this.brandsField = "//label[@title = 'Brands']";
    this.tagsField = "//label[@title = 'Tags']";
    this.categoriesField = "//label[@title = 'Categories']";
    this.rewardCreationNextButton = '//button[span = "Next"]';
    this.dateErrorMessage = "//label[text() = 'Start date & end date required']";
    this.fieldToScrollDown = "campaign_lifetime_max_available";
    this.endOFMonthDateButton = "//span[text() = 'END OF MONTH']";
    this.submitRewardCreationButton = "//button[@type = 'submit']";
    this.newRewardElementSearch = "//div[text() = '1 Test reward name']";
    
    this.bulkFileDownloadUrl = 'https://www.perxtech.io/dashboard/p/bulkaction';
    this.uploadFileButotn = "//button";
    this.fileInputElement = "//input[@type = 'file']";
    this.submitUploadButton = "//button[@class='ant-btn ant-btn-primary']";
    this.findUploadedTXTFile = "//td[text()='users.txt']";
    this.findUploadedCSVFile = "//td[text()='users.csv']";
    this.findUploadedLXLSFile = "//td[text()='users.xlsx']";
  }



}
