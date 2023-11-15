import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service";
import template from './contacts.template.html'
import styles from './contacts.module.scss'

export class Contacts extends ChildComponent { 
    render() {
        this.element = renderService.htmlToElement(template, [], styles)
        return this.element
    }
}