import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './auth.template.html'
import styles from './auth.module.scss'
import { AuthService } from '@/api/auth.service'
import { $Q } from '@/core/qwquery/qwquery.lib'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $Q(this.element).find('label:first-child')
		const passwordLabel = $Q(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}

		if (!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target)
		if (!this.#validateFields(formValues)) return
	}

	#changeFormType = event => {
		event.preventDefault()

		$Q(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign In')

		$Q(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')

		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		$Q(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$Q(this.element).find('#change-form-type').click(this.#changeFormType)

		$Q(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
