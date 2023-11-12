import { QwekoQuery } from "@/core/qweko-query/qweko-query.lib"

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return QwekoQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}
