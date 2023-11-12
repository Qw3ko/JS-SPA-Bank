import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service";
import template from './logout-button.template.html'
import styles from './logout-button.module.scss'
import { $Q } from '@/core/qwquery/qwquery.lib';

export class LogoutButton extends ChildComponent {
    
    constructor({router}) {
        super()

        this.router = router
    }
    
    render() {
        this.element = renderService.htmlToElement(template, [], styles)

        $Q(this.element).find('button').click(() => {
            this.router.navigate('/auth')
        })

        return this.element
    }
}