import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import template from './transaction-item.template.html'
import styles from './transaction-item.module.scss'
import { $Q } from '@/core/qwquery/qwquery.lib'
import { formatDate } from '@/utils/format/format-to-date'
import { formatToCurrency } from '@/utils/format/format-to-currency'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$Q(this.element).addClass(styles.income)
		}

		$Q(this.element).find('#transaction-name').text(name)

		$Q(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))
            
		$Q(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
