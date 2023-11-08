import { BaseScreen } from "@/core/component/base-screen.component";
import renderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'
import { $Q } from "@/core/qwquery/qwquery.lib";

export class Home extends BaseScreen { 
    constructor () {
        super( {title : 'Home'} )
    }
    render() {
        const element = renderService.htmlToElement(template, [], styles)

        $Q(element).find('h1').css('color', 'black')

        return element
    }
}