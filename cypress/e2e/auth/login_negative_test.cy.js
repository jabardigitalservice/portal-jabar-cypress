import { LoginPage } from "../../support/pages/auth/login_page.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

let loginPage = new LoginPage()
let user

before(() => {
	cy.fixture("credentials.json").then((data) => {
		user = data
	})
})

beforeEach(() => {
	loginPage.navigateLoginPage()
})

describe("Login Negative Scenario", () => {
	qase(225,
		it("Email not registered", () => {
			loginPage.enterEmail(user.emailNotRegister)
			loginPage.enterPassword(user.password)
			loginPage.clickBtnMasuk()
			loginPage.alertFailedLogin()
		})
	)

	qase(226,
		it("Do login with wrong password values", () => {
			loginPage.enterEmail(user.email)
			loginPage.enterPassword(user.passwordWrong)
			loginPage.clickBtnMasuk()
			loginPage.alertFailedLogin()
		})
	)

	qase(227,
		it("Do login with wrong email format", () => {
			loginPage.enterEmail(user.emailWrong)
			loginPage.enterPassword(user.password)
			loginPage.clickBtnMasuk()
		})
	)

	qase(228,
		it("Do login with null values [Negative]", () => {
			loginPage.clickBtnMasuk()
		})
	)

	qase(229,
		it.only("3 times wrong login", () => {
			loginPage.wrongLogin3Times()
			loginPage.containsModalsForgotPassword()
			loginPage.clickBtnBatalForgotPassword()
		})
	)
})
