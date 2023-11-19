import { BaseScreen } from "@/core/component/base-screen.component";
import renderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'
import { CardInfo } from "./card-info/card-info.component";
import { Actions } from "./actions/actions.component";
import { Contacts } from "./contacts/contacts.component";
import { Transactions } from "./transactions/transactions.component";
import { Statistics } from "./statistics/statistics.component";
import { Store } from "@/core/store/store";
import { $Q } from "@/core/qwquery/qwquery.lib";
import { AuthRequiredMessage } from "@/components/ui/auth-required-message/auth-required-message.component";

export class Home extends BaseScreen {
    
    constructor () {
        super( {title : 'Home'} )

        this.store = Store.getInstance()
        this.store.addObserver(this)

        this.component = {
            cardInfo: null,
            transactions: null,
            statistics: null
        }
    }

    createOrUpdateComponent(component, componentName) {
        if (this.component[componentName]) {
            this.component[componentName].destroy()
        }
        this.component[componentName] = new component()
        return this.component[componentName]
    }

    update() {
        this.user = this.store.state.user

        if (!this.user) {
            $Q(this.element).html(new AuthRequiredMessage().render().outerHTML)
        }
    }

    render() {
        const componentsToRender = [
            this.createOrUpdateComponent(CardInfo, 'cardInfo'),
            this.createOrUpdateComponent(Transactions, 'transactions'),
            this.createOrUpdateComponent(Statistics, 'statistics'),
            Actions,
            Contacts
        ]

        this.element = renderService.htmlToElement(
            template,
            componentsToRender,
            styles
        )

        this.update()

        return this.element
    }
}