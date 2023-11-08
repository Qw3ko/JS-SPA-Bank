import { BaseScreen } from "@/core/component/base-screen.component";

export class Auth extends BaseScreen {
    constructor () {
        super( {title : 'Authentication'} )
    }
    render(){
        return '<p>Auth</p>'
    }
}