import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service";
import template from './header.template.html'
import styles from './header.module.scss'
import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

export class Header extends ChildComponent {
    
    constructor({router}) {
        super()

        this.router = router
    }

    render() {
        this.element = renderService.htmlToElement(template, [
            Logo, 
            new LogoutButton({
                router: this.router
            }), 
            Search,
            new UserItem({
                avatarPath: 'https://sun9-9.userapi.com/impg/iUV_cuz2Nvihu_F-18mfU6Uj3uugjWmJHmIUbA/IsYB3bk671g.jpg?size=256x256&quality=96&sign=2ba2dad3745e861b894c5840eb5d1aec&type=album',
                name: 'Name'
            })
        ], styles)
        return this.element
    }
}