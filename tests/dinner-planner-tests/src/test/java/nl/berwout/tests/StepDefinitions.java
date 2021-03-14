package  nl.berwout.tests;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URI;
import java.time.Duration;

public class StepDefinitions{
    WebDriver driver;

    @Given("We are on the add meals form")
    public void weAreOnTheAddMealsForm() throws MalformedURLException {
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("ignore-certificate-errors");
        chromeOptions.setHeadless(true);
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability(CapabilityType.BROWSER_NAME,"chrome");

        caps.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
        String seleniumUri = System.getProperty("SELENIUM_URI");
        System.out.println("Selenium uri: " + seleniumUri);
        if(seleniumUri == null || seleniumUri.isEmpty()) {
            seleniumUri = "http://localhost:4444";
        };
        driver = new RemoteWebDriver(URI.create(seleniumUri).toURL(), caps);
        String testUri = System.getProperty("TEST_URI");
        System.out.println("Test uri: " + testUri);
        if(testUri == null || testUri.isEmpty()) {
            testUri = "http://localhost:4200";
        };
        driver.navigate().to(testUri + "/addMeal");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("ingredient")));
    }

    @When("I add ingredients by clicking and writing")
    public void iAddIngredientsByClickingAndWriting() {
        driver.findElement(By.id("mealNameInput")).sendKeys("Super awesome meal");
        driver.findElement(By.xpath("//*[text()='Radishes']")).click();
        driver.findElement(By.id("ingredient-name-1")).sendKeys("Green beans");
        driver.findElement(By.id("ingredient-amount-1")).sendKeys("500");
        driver.findElement(By.xpath("//*[text()='Cucumber']")).click();
    }

    @And("I submit the form")
    public void iSubmitTheForm() {
        driver.findElement(By.className("submit-button")).click();
    }

    @Then("We should have successfully added a new meal")
    public void weShouldHaveSuccesfullyAddedANewMeal() {

    }

}
