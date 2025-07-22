import UserInfo from "./UserInfo";
import UserProgress from "./UserProgress";
const UserPanel = () => {
    return (
        <div className="flex flex-row flex-1 justify-between gap-5  flex-wrap">
            <UserInfo />
            <UserProgress />
        </div>
    );
};

export default UserPanel;
