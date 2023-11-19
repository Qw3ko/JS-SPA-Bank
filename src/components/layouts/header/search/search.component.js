import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import template from './search.template.html'
import styles from './search.module.scss'
import { $Q } from '@/core/qwquery/qwquery.lib'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/utils/debounce'
import { TRANSFER_FIELD_SELECTOR } from '@/components/screens/Home/contacts/transfer-field/transfer-field.component'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

export class Search extends ChildComponent {
	constructor() {
		super()

		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = $Q(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					$Q(TRANSFER_FIELD_SELECTOR).value(
					formatCardNumberWithDashes(user.card.number)
				)
				
				searchResultElement.html('')
				}).render()

				
				$Q(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$Q(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(this.#handleSearch, 300)

		$Q(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debouncedHandleSearch)

		return this.element
	}
}
