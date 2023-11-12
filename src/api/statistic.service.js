import { QwekoQuery } from "@/core/qweko-query/qweko-query.lib"

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return QwekoQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}