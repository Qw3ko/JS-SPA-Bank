import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service";
import template from './user-item.template.html'
import styles from './user-item.module.scss'
import { $Q } from '@/core/qwquery/qwquery.lib';

export class UserItem extends ChildComponent {

    constructor(user, isGray = 'false', onClick) {
        super()

        if(!user) throw new Error('User should be passed!')
        if(!user?.name) throw new Error('User must have a "name"!')
        if(!user?.avatarPath) throw new Error('User must have a "avatarPath"!')

        this.user = user
        this.onClick = onClick
        this.isGray = isGray
    }

    #preventDefault(event) {
        event.preventDefault()
    }

    update({avatarPath, name}) {
        if (avatarPath, name) {
            $Q(this.element).find('img').attr('src', avatarPath).attr('alt', name)

            $Q(this.element).find('span').text(name)
        }
    }

    render() {
        this.element = renderService.htmlToElement(template, [], styles)

        this.update(this.user)

        $Q(this.element).click(this.onClick || this.#preventDefault.bind(this))

        if(!this.onClick) $Q(this.element).attr('disabled', '')
        if(this.isGray) $Q(this.element).addClass(styles.gray)

        return this.element
    }
}