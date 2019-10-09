import {By, until} from "selenium-webdriver";
import SignInPage from "./testSetup";
let page  = new SignInPage();
export async function findElementWithID (driver, id, timeout = 20000) {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}
 export async function findElementWithName (driver, name, timeout = 20000) {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}
 export async function findElementWithXpath(driver, xpath,  timeout = 20000) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout)
  return await driver.wait(until.elementIsVisible(el), timeout)
}
 export async  function checkIfDisplayed(driver, xpath, timeout = 20000){
  const el = driver.findElement(By.xpath(page.labelsField)).isDisplayed();
  return el;
}