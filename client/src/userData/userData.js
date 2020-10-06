import {extendObservable} from "mobx";

class userData {
    constructor(){
        extendObservable(this, {
            //looking if log in form is loading and if user is logged in//
            loading: true,
            isLoggedIn: false,
            username: ""
        })
    }
}
export default new userData ();