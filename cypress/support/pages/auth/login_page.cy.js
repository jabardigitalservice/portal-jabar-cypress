import login from "../../selectors/login"
import navbar from "../../selectors/navbar"

export class LoginPage {
	navigateLoginPage() {
		cy.visit(Cypress.env("base_url"))
		cy.title().should("eq", "Portal Jabar - Content Management System")
		cy.contains("Selamat Datang! Silakan masukkan e-mail dan kata sandi untuk masuk ke Portal Jabar Content Management System.")
	}

	enterEmail(email) {
		const emails = cy.get(login.email)

		emails.clear()
		emails.should("be.visible")
		emails.should("have.attr", "type", "email")
		emails.type(email)
	}

	enterPassword(password) {
		const passwords = cy.get(login.password)

		passwords.clear()
		passwords.should("be.visible")
		passwords.should("have.attr", "type", "password")
		passwords.type(password)
	}

	clickBtnMasuk() {
		const btnMasuk = cy.get(login.btnMasuk)

		btnMasuk.then(($btn) => {
			if ($btn.is(":disabled")) {
				btnMasuk.should("be.disabled").and("contain", "Masuk")
			} else {
				btnMasuk.should("be.visible")
				btnMasuk.contains("Masuk")
				btnMasuk.click()
			}
		})
	}

	loadCmsPage() {
		cy.intercept(Cypress.env("base_url")).as("loginSuccess")

		cy.title().should("eq", "Portal Jabar - Content Management System")

		const titleDashboard = cy.get(navbar.titleDashboard)

		cy.url().then(($url) => {
			if ($url.includes(Cypress.env("base_url"))) {
				titleDashboard.should("contain", "Dashboard")
			} else if ($url.includes(Cypress.env("base_url") + "/agenda")) {
				titleDashboard.should("contain", "Agenda Jawa Barat")
			}
		})

		const userName = cy.get(navbar.nameUserLogin)
		userName.should("contain", "Group Admin")
	}

	alertFailedLogin() {
		const alert = cy.get(login.alertFailed)

		alert.should("be.visible").and("contain", "Email atau kata sandi tidak sesuai")
	}

	closeAlertFailed() {
		const closeAlert = cy.get(login.alertFailed)
		closeAlert.find('g').click({ force: true })
	}

	clickBtnBatalForgotPassword() {
		const btnBatal = cy.get(login.btnBatalModalsForgotPassword)

		btnBatal.should("be.visible").and("contain", "Batal")
		btnBatal.click()
	}

	containsModalsForgotPassword() {
		const modalsForgot = cy.get(login.modalsForgotPassword)

		modalsForgot.should("be.visible").and("contain", "Masukkan alamat email Anda agar dapat kami kirimkan tautan untuk dapat merubah kata sandi.")
	}

	wrongLogin3Times() {
		let credentials = "cypress/fixtures/credentials.json"

		cy.readFile(credentials).then((object) => {
			const doLogin = [
				{
					email: object.emailNotRegister,
					password: object.password,
				},
				{
					email: object.emailNotRegister2,
					password: object.password,
				},
			]

			doLogin.forEach(({ email, password }) => {
				this.enterEmail(email)
				this.enterPassword(password)
				this.clickBtnMasuk()
				this.closeAlertFailed()
			})

			this.enterEmail(object.emailNotRegister3)
			this.enterPassword(object.password)
			this.clickBtnMasuk()
		})
	}

	logout() {
		const btnProfile = cy.get(navbar.btnProfile)

		btnProfile.should("be.visible")
		btnProfile.click()

		const btnKeluar = cy.get(navbar.btnKeluar)
		btnKeluar.should("be.visible").and("contain", "Keluar")
		btnKeluar.click()

		const btnYakin = cy.get(navbar.btnYakinModalsLogout)
		btnYakin.should("be.visible").and("contain", "Ya, saya yakin")
		btnYakin.click()

		cy.url().should("eq", Cypress.env("base_url") + "/login")
	}
}
