import { QwekoQuery } from "@/core/qweko-query/qweko-query.lib"

export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return QwekoQuery({
			path:
				this.#BASE_URL +
				`?${new URLSearchParams({
					orderBy: 'desc'
				})}`,
			onSuccess
		})
	}
}
