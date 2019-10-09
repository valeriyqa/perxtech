import {Builder, By, error, Key, until} from 'selenium-webdriver';
import webdriver from 'selenium-webdriver';
import SignInPage from './testSetup';
import * as util from './utils'; 


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
describe('Reward moderator, rewards validation checks', () => {
  let driver;
  let page;
  jest.setTimeout(30000);
  beforeAll(async () => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver.manage().setTimeouts( { implicit: 10000, pageLoad:
        10000, script: 10000 } )
    page = new SignInPage();
  }, 20000);
    afterAll(async () => {
      await driver.quit();
    });
  test('Login as reward admin', async () => {
     await driver.get(page.loginUrl);
     const emailInput = await util.findElementWithID(driver,page.emailFieldID);
     const passwordInput = await util.findElementWithID(driver,page.passwordFieldID);
     const submitButton = await util.findElementWithXpath(driver,page.submitButtonXpath);
     await emailInput.sendKeys(page.reward_admin_email);
     await passwordInput.sendKeys(page.reward_admin_password);
     await submitButton.click();
     await driver.wait( sleep(2000), 3000);
     let rewardsBlock = await util.findElementWithXpath(driver,page.rewardsBlockXpath);
     let expected = await driver.getCurrentUrl();
     let actualPageUrl = page.rewardsListUrl;
     expect(expected).toEqual(actualPageUrl);
  });
  test('Reward fields span check', async () => {
    const createNewButton = await util.findElementWithXpath(driver,page.newRewardButtonXpath);
    await  createNewButton.click();
    const lonelyField = await util.findElementWithName(driver, page.rewardNameField); 
    await driver.wait( sleep(2000), 3000);
    await lonelyField.sendKeys(Key.PAGE_DOWN);
    await lonelyField.sendKeys(Key.PAGE_DOWN);
    await driver.wait( sleep(2000), 3000);
    const addFieldButton = await util.findElementWithXpath(driver, page.addFieldButton);
    await addFieldButton.click();
    await lonelyField.sendKeys(Key.PAGE_DOWN);
    await lonelyField.sendKeys(Key.PAGE_DOWN);
    await driver.wait( sleep(1000), 3000);
    const switchForCustomFields = await util.findElementWithXpath(driver, page.switchCustomFieldsBlock);
    await switchForCustomFields.click();
    await driver.wait( sleep(1000), 3000);
    await switchForCustomFields.click();
    await driver.wait( sleep(1000), 3000);
    const createdCustomField = await util.checkIfDisplayed(driver, page.createdCustomField);
    try {
      expect(createdCustomField).toBe(false);
    }catch(err){throw new Error('Fields are not cleared after span');}
  });

  test('Private reward check', async () => {
    await driver.get(page.rewardsListUrl);
    const createNewButton = await util.findElementWithXpath(driver,page.newRewardButtonXpath);
    await  createNewButton.click();
    await driver.wait( sleep(1000), 3000);
    const privateRewardRadiobutton = await util.findElementWithXpath(driver, page.privateRewardRadiobutton);
    await privateRewardRadiobutton.click();
    try {
      const cataloguesField = await driver.findElement(By.xpath(page.cataloguesField)).isDisplayed();
      expect(cataloguesField).toBe(false);
      const labelsField = await driver.findElement(by.xpath(page.labelsField)).isDisplayed();
      expect(labelsField).toBe(false);
      const brandsField = await driver.findElement(By.xpath( page.brandsField)).isDisplayed();
      expect(brandsField).toBe(false);
      const tagsField = await driver.findElement(By.xpath(page.tagsField)).isDisplayed();
      expect(tagsField).toBe(false);
      const categoriesField = await driver.findElement(By.xpath(page.categoriesField)).isDisplayed();
      expect(categoriesField).toBe(false);
    }
    catch (err)
    {
      throw new Error("Test failed! Public fields are still present");
    }
    
  });
  test('Reward End date check', async () => {
    const nextButton = await util.findElementWithXpath(driver, page.rewardCreationNextButton)
    await nextButton.click();
    await nextButton.click();
    const dateErrorMessage = await driver.findElement(By.xpath(page.dateErrorMessage)).isDisplayed();
    expect(dateErrorMessage).toBe(true);
  });
  test('creating a reward', async () => {
    await driver.get(page.rewardsListUrl);
    const createNewButton = await util.findElementWithXpath(driver,page.newRewardButtonXpath);
    await  createNewButton.click();
    const nameField = await util.findElementWithName(driver, page.rewardNameField);
    await nameField.sendKeys(page.testRewardName);
    const nextButton = await util.findElementWithXpath(driver, page.rewardCreationNextButton)
    await nextButton.click();
    const lonelyField = await util.findElementWithName(driver, page.fieldToScrollDown); 
    await lonelyField.sendKeys(Key.PAGE_DOWN);
      await driver.wait( sleep(1000), 3000);
      const button1 = await util.findElementWithXpath(driver, page.endOFMonthDateButton);
      await button1.click();
      await nextButton.click();
    let launchButton = await util.findElementWithXpath(driver, page.submitRewardCreationButton);
      await launchButton.click();
      await driver.get(page.rewardsListUrl);
      try {
        const createdReward = await driver.findElement(By.xpath(page.newRewardElementSearch)).isDisplayed();
        expect(createdReward).toBe(false);
      }
      catch(err){
      }
      
    });
});

describe('Admin, files upload', () => {
  let driver;
  let page;
  jest.setTimeout(30000);
  beforeAll(async () => {

    //driver = setupDriver();
    driver = new webdriver.Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver.manage().setTimeouts( { implicit: 10000, pageLoad:
        10000, script: 10000 } )
    page = new SignInPage();
  }, 20000);
  afterAll(async () => {
    await driver.quit();
  });
  test('Login as admin', async () => {
    await driver.get(page.loginUrl);
    const emailInput = await util.findElementWithID(driver,page.emailFieldID);
    const passwordInput = await util.findElementWithID(driver,page.passwordFieldID);
    const submitButton = await util.findElementWithXpath(driver,page.submitButtonXpath);
    await emailInput.sendKeys(page.admin_email);
    await passwordInput.sendKeys(page.admin_password);
    await submitButton.click();
    await driver.wait( sleep(1000), 3000);
    await sleep(1000);
    let expected = await driver.getCurrentUrl();
    let actual = page.adminDashboardUrl;
    expect(expected).toEqual(actual);
  });
  test('Upload a txt file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
    try {
      const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFilInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFilInput.sendKeys(page.pathToTXTFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedTXTFile)).isDisplayed();
    expect(uploadedFileName).toBe(true);
  });

  test('Upload a csv file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
    try {
      const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFileInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFileInput.sendKeys( page.pathToCSVFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedCSVFile)).isDisplayed();
    expect(uploadedFileName).toBe(true);
  });
  test('Upload a xlsx file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
     try {
       const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFilInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFilInput.sendKeys( page.pathToLXLSFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    try {


      const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedLXLSFile)).isDisplayed();
      expect(uploadedFileName).toBe(true);
    }
    catch(err)
    {throw new Error('Failed to upload an .xlsx file');}
  });
  
});


describe('Reward moderator, files upload', () => {
  let driver;
  let page;
  jest.setTimeout(30000);
  beforeAll(async () => {

    //driver = setupDriver();
    driver = new webdriver.Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver.manage().setTimeouts( { implicit: 10000, pageLoad:
        10000, script: 10000 } )
    page = new SignInPage();

    // driver.manage().timeouts().implicitlyWait(20000);
  }, 20000);
  afterAll(async () => {
    await driver.quit();
  });

  test('Login as reward moderator', async () => {
  await driver.get(page.loginUrl);
     const emailInput = await util.findElementWithID(driver,page.emailFieldID);
     const passwordInput = await util.findElementWithID(driver,page.passwordFieldID);
     const submitButton = await util.findElementWithXpath(driver,page.submitButtonXpath);
     await emailInput.sendKeys(page.reward_admin_email);
     await passwordInput.sendKeys(page.reward_admin_password);
     await submitButton.click();
     await driver.wait( sleep(1000), 3000);
     await sleep(3000)
     let rewardsBlock = await util.findElementWithXpath(driver,page.rewardsBlockXpath);
     let expected = await driver.getCurrentUrl();
     let actualPageUrl = page.rewardsListUrl;
     expect(expected).toEqual(actualPageUrl);
  });
 test('Upload a txt file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
    try {
      const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFilInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFilInput.sendKeys(page.pathToTXTFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedTXTFile)).isDisplayed();
    expect(uploadedFileName).toBe(true);
  });

  test('Upload a csv file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
    try {
      const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFilInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFilInput.sendKeys( page.pathToCSVFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedCSVFile)).isDisplayed();
    expect(uploadedFileName).toBe(true);
  });
  test('Upload a xlsx file', async () => {
    await driver.get(page.bulkFileDownloadUrl);
     try {
       const uploadFileButton = await util.findElementWithXpath(driver,page.uploadFileButotn);
      await uploadFileButton.click();
    }
    catch(err){
      throw new Error("Can not find an'UPLOAD' button");
    }
    const uploadFilInput = await driver.findElement(By.xpath(page.fileInputElement));
    await uploadFilInput.sendKeys( page.pathToLXLSFile);
    const submitUploadButton = await util.findElementWithXpath(driver, page.submitUploadButton);
    await submitUploadButton.click();
    await driver.wait( sleep(1000), 3000);
    try {


      const uploadedFileName = await driver.findElement(By.xpath(page.findUploadedLXLSFile)).isDisplayed();
      expect(uploadedFileName).toBe(true);
    }
    catch(err)
    {throw new Error('Failed to upload an .xlsx file');}
  });
  

});

