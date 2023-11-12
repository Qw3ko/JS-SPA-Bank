import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service";
import template from './search.template.html'
import styles from './search.module.scss'
import { $Q } from '@/core/qwquery/qwquery.lib';

export class Search extends ChildComponent { 
    render() {
        this.element = renderService.htmlToElement(template, [], styles)

        $Q(this.element)
        .find('input')
        .input({
            type: 'search',
            name: 'search',
            placeholder: 'Search contacts...'
        })
        
        return this.element
    }
}