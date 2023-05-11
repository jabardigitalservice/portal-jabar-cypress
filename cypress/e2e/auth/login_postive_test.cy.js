import { LoginPage } from "../../support/pages/auth/login_page.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let loginPage = new LoginPage()
let user

before(() => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

beforeEach(() => {
    loginPage.navigateLoginPage()
})

afterEach(() => {
    qase(230,
        loginPage.logout()
    )
})

describe("Login Positive Scenario", () => {
    qase(224,
        it("S22A2 - Success Login - Email and password Valid", () => {
            loginPage.enterEmail(user.email)
            loginPage.enterPassword(user.password)
            loginPage.clickBtnMasuk()
            loginPage.loadCmsPage()
        })
    )
})
