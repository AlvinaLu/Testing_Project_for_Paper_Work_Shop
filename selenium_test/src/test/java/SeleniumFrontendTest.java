import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.html5.LocalStorage;
import org.openqa.selenium.html5.WebStorage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertTrue;

class SeleniumFrontendTest {

    private WebDriver driver;
    private String login = "alvina@gmail.com";
    private String password = "12345678";
    private String firsName = "Alvina";
    private String lastName = "Lushnikova";
    private String postalCode = "19000";
    private String city = "Praha";
    private String address = "Kolbenova, 94";
    private String number = "+420773522852";
    private ObjectMapper mapper = new ObjectMapper();


    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().fullscreen();
        driver.get("http://localhost");

    }

    @AfterEach
    public void end() {
        driver.close();
    }

    @Test
    public void loginTest_SuccessLogin_Helper() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        WebElement loginLink = driver.findElement(By.cssSelector("#root > div > div.MuiPaper-root.jss2.MuiPaper-elevation1.MuiPaper-rounded > div > a:nth-child(3)"));
        loginLink.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("loginText")));
        WebElement loginField = driver.findElement(By.id("loginText"));
        loginField.sendKeys(login);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("passwordText")));
        WebElement passwordField = driver.findElement(By.id("passwordText"));
        passwordField.sendKeys(password);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnSubmitLogin")));
        WebElement btnLogIn = driver.findElement(By.id("btnSubmitLogin"));
        btnLogIn.click();

    }

    @Test
    public void loginTest_SuccessLogin_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        WebElement loginLink = driver.findElement(By.cssSelector("#root > div > div.MuiPaper-root.jss2.MuiPaper-elevation1.MuiPaper-rounded > div > a:nth-child(3)"));
        loginLink.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("loginText")));
        WebElement loginField = driver.findElement(By.id("loginText"));
        loginField.sendKeys(login);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("passwordText")));
        WebElement passwordField = driver.findElement(By.id("passwordText"));
        passwordField.sendKeys(password);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnSubmitLogin")));
        WebElement btnLogIn = driver.findElement(By.id("btnSubmitLogin"));
        btnLogIn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("good1")));
        WebElement addBtn = driver.findElement(By.id("good1"));

        assertTrue(driver.getCurrentUrl().equals("http://localhost/1"));


    }

    @Test
    public void addToCardTest_SuccessAdd_True() throws IOException {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("good1")));
        WebElement addBtn = driver.findElement(By.id("good1"));
        addBtn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnRoundedCard")));
        WebElement cardBtn = driver.findElement(By.id("btnRoundedCard"));
        cardBtn.click();

        driver.manage().timeouts().implicitlyWait(100, TimeUnit.MILLISECONDS);
        LocalStorage local = ((WebStorage) driver).getLocalStorage();
        System.out.println(local.getItem("cart"));
        driver.manage().timeouts().implicitlyWait(100, TimeUnit.MILLISECONDS);
        Map<String, Integer> cart = mapper.readValue(local.getItem("cart"), new TypeReference<Map<String, Integer>>() {
        });

        assertTrue(cart.containsKey("1"));
        assertTrue(cart.containsValue(1));
    }

    @Test
    public void tryToBuyProductWithoutLogin_GoToSignIntPage_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("good1")));
        WebElement addBtn = driver.findElement(By.id("good1"));
        addBtn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnRoundedCard")));
        WebElement cardBtn = driver.findElement(By.id("btnRoundedCard"));
        cardBtn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("goToSignIn")));
        WebElement checkout = driver.findElement(By.id("goToSignIn"));
        checkout.click();

        assertTrue(driver.getCurrentUrl().equals("http://localhost/sign-in"));

    }

    @Test
    public void tryToBuyProductWithLogin_GoToOrder_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        loginTest_SuccessLogin_Helper();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("good1")));
        WebElement addBtn = driver.findElement(By.id("good1"));
        addBtn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnRoundedCard")));
        WebElement cardBtn = driver.findElement(By.id("btnRoundedCard"));
        cardBtn.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("goToCheckout")));
        WebElement checkout = driver.findElement(By.id("goToCheckout"));
        checkout.click();

        driver.manage().timeouts().implicitlyWait(200, TimeUnit.MILLISECONDS);
        assertTrue(driver.getCurrentUrl().equals("http://localhost/order"));

    }

    @Test
    public void addPostalCode_ShowError_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        tryToBuyProductWithLogin_GoToOrder_True();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("postalCode")));
        WebElement textPostalCode = driver.findElement(By.id("postalCode"));
        textPostalCode.sendKeys("123456");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("postalCodeError")));
        WebElement textPostalCodeError = driver.findElement(By.id("postalCodeError"));

        assertTrue(textPostalCodeError.getText().equals("The postcode was entered incorrectly"));

    }

    @Test
    public void addMobileNumber_ShowError_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        tryToBuyProductWithLogin_GoToOrder_True();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("number")));
        WebElement number = driver.findElement(By.id("number"));
        number.sendKeys("12345634567895");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("numberError")));
        WebElement numberError = driver.findElement(By.id("numberError"));

        assertTrue(numberError.getText().equals("The phone number was entered incorrectly"));

    }

    @Test
    public void addMobileNumber_CorrectNumber_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        tryToBuyProductWithLogin_GoToOrder_True();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("number")));
        WebElement numberText = driver.findElement(By.id("number"));
        numberText.sendKeys(number);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("numberError")));
        WebElement numberError = driver.findElement(By.id("numberError"));
        assertTrue(numberError.getText().isEmpty());
    }

    @Test
    public void addAllData_CorrectData_True() {
        WebDriverWait wait = new WebDriverWait(driver, 10);

        tryToBuyProductWithLogin_GoToOrder_True();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("firstName")));
        WebElement firstNameText = driver.findElement(By.id("firstName"));
        firstNameText.sendKeys(firsName);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("LastName")));
        WebElement lastNameText = driver.findElement(By.id("LastName"));
        lastNameText.sendKeys(lastName);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("postalCode")));
        WebElement postalCodeText = driver.findElement(By.id("postalCode"));
        postalCodeText.sendKeys(postalCode);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("adress")));
        WebElement addressText = driver.findElement(By.id("adress"));
        addressText.sendKeys(address);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("city")));
        WebElement cityText = driver.findElement(By.id("city"));
        cityText.sendKeys(city);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("number")));
        WebElement numberText = driver.findElement(By.id("number"));
        numberText.sendKeys(number);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));
        WebElement btnPay = driver.findElement(By.id("submit"));
        btnPay.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("circular")));

        assertTrue(driver.getCurrentUrl().equals("http://localhost/payment"));
    }


}