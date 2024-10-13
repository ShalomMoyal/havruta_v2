import {WebAppNavbarComponent} from "~/components/web-app-navbar"
import {ProposalListComponent} from "~/components/proposal-list"
function MainPage() {
    return (  
        <>
            <WebAppNavbarComponent />
            <ProposalListComponent />
        </>
    );
}
export default MainPage;